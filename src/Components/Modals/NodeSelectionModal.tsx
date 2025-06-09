import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import { IconPlus, IconSearch, IconSortDescending } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { useViewbox } from "../../Hooks/useViewbox";
import { useTree } from "../../Hooks/useTree";
import { NodePreview } from "../NodePreview";
import { Modal } from "../Modal";
import styled from "styled-components";
import { usePlayerPref } from "../../Hooks/usePlayerPref";
import { Menu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { PlayerPrefStore } from "../../Types/PlayerPrefStore";
import { useShallow } from "zustand/react/shallow";
import { Input } from "../StyledComponents/Input";
import { InvisibleButton } from "../Generics/Button";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { usePortSelection } from "../../Hooks/usePortSelection";
import { CategoryButton, TagList } from "./CategoryButton";
import { SearchForm } from "./SearchForm";
import { PortType } from "../../Types/PortType";
import { NodeData } from "../../Types/NodeData";
import { useNodeSelectionModal } from "../../Hooks/useNodeSelectionModal";

const AddModalDiv = styled.div`
  display: flex;
  padding: 0;
  margin: 0;
  align-items: stretch;
  justify-content: stretch;
  width: 100%;
  height: 500px;
  align-content: stretch;
  align-self: stretch;
  flex-grow: 1;
  flex-direction: column;
  gap: var(--padding-large);
  padding-top: var(--padding-large);
`;

const NodeList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  overflow: auto;
  gap: var(--padding-small);
`;

type SearchTermData = {
  tags: string[];
  name: string;
  output: PortType | null;
  input: PortType | null;
};

const TagRegex = /tag:(\w+)/gi;
const OutputRegex = new RegExp(`output:(${portTypesWithTags(["common"]).join("|")})`, "gi");
const InputRegex = new RegExp(`input:(${portTypesWithTags(["common"]).join("|")})`, "gi");

const parseSearchTerm = (raw: string): SearchTermData => {
  const base = raw.trim().toLowerCase();
  const resultTag = Array.from(base.matchAll(TagRegex));
  const output = OutputRegex.exec(base);
  const input = InputRegex.exec(base);
  return {
    name: base.replaceAll(TagRegex, "").replaceAll(OutputRegex, "").replaceAll(InputRegex, "").trim(),
    tags: resultTag.map((r) => r[1]),
    output: output ? (output[1] as PortType) : null,
    input: input ? (input[1] as PortType) : null,
  };
};

export function NodeSelectionModal({ close }: { close: () => void }) {
  let a = extractFilteredEdgeTypeFromEditedEdge();
  const [searchTermRaw, setSearchTerm] = useState(a);
  const searchTerm = useMemo(() => parseSearchTerm(searchTermRaw), [searchTermRaw]);
  const nodeFav = usePlayerPref();
  const isShader = useTree((state) => state.getCustomNodeEditingType() === "shader");
  const treeShaderLib = useTree(useShallow((state) => state.getNodeLibrary()));
  const nodeLibrary = useMemo(
    () =>
      Object.values(treeShaderLib).filter((item) => {
        if (item.hideInLibrary) {
          return false;
        }
        return isShader ? item.getShaderCode !== undefined : item.getData !== undefined || item.executeAs != null;
      }),
    [isShader, treeShaderLib]
  );

  const filteredList = useMemo(
    () =>
      nodeLibrary.filter((item) => {
        if (searchTerm.tags.length > 0) {
          for (let index = 0; index < searchTerm.tags.length; index++) {
            const target = searchTerm.tags[index];
            if (!item.tags.some((tag) => tag.toLowerCase() === target)) {
              return false;
            }
          }
        }
        if (searchTerm.input) {
          if (typeof item.hasInput === "function") {
            if (!item.hasInput(searchTerm.input)) {
              return false;
            }
          } else {
            if (!item.dataInputs.some((port) => port.type === searchTerm.input)) {
              return false;
            }
          }
        }
        if (searchTerm.output) {
          if (typeof item.hasOutput === "function") {
            if (!item.hasOutput(searchTerm.output)) {
              return false;
            }
          } else {
            if (!item.dataOutputs.some((port) => port.type === searchTerm.output)) {
              return false;
            }
          }
        }

        return searchTerm.name.length === 0 || item.id.toLowerCase().includes(searchTerm.name) || item.alias?.toLowerCase().includes(searchTerm.name);
      }),
    [nodeLibrary, searchTerm]
  );
  const finalList = useMemo(() => sortNodeList(nodeFav, filteredList, searchTerm.name.length === 0), [filteredList, nodeFav, searchTerm]);

  const tags = useMemo(
    () =>
      nodeLibrary
        .flatMap((item) => item.tags) // Get the tags from all the node in the library
        .filter((value, index, array) => array.indexOf(value) === index),
    [nodeLibrary] // Remove duplicate // Everytime the librairy has change
  );

  const addNode = useTree((state) => state.addNode);

  const onClickNode = useCallback(
    (node: NodeDefinition) => {
      var view = useViewbox.getState();
      var modalInfo = useNodeSelectionModal.getState().targetPosition;
      console.log(modalInfo);
      const target = modalInfo || ([view.x + window.innerWidth * 0.5 * view.scale, view.y + window.innerHeight * 0.5 * view.scale] as const);
      let targetTypeChange: PortType | null = null;
      if (searchTerm.input && node.hasInput) {
        targetTypeChange = node.hasInput(searchTerm.input);
      }
      if (searchTerm.output && node.hasOutput) {
        targetTypeChange = node.hasOutput(searchTerm.output);
      }
      addNode(node.id, ...target, (n, d) => {
        setTargetType(n, d, targetTypeChange);
        if (node.onManualCreation) {
          node.onManualCreation(n);
        }
      });
      nodeFav.markNodeAsUsed(node.id);
      close();
    },
    [addNode, close, nodeFav]
  );

  function onSubmitSearch(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (finalList && finalList.length > 0) {
      onClickNode(finalList[0]);
    }
  }

  function toggleTag(tag: string): void {
    var key = `tag:${tag.toLowerCase()}`;
    var regexKey = new RegExp(key, "gi");
    if (searchTermRaw.match(regexKey)) {
      setSearchTerm(searchTermRaw.replaceAll(regexKey, "").trim());
    } else {
      setSearchTerm(searchTermRaw.trim() + " " + key);
    }
  }

  return (
    <Modal
      title="Add a new node"
      icon={IconPlus}
      onClose={close}
      size="small">
      <AddModalDiv>
        <SearchForm onSubmit={onSubmitSearch}>
          <span>
            <IconSearch> </IconSearch>
            <Input
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTermRaw}
              placeholder="filter..."
              autoFocus></Input>
          </span>

          <Menu
            menuButton={
              <InvisibleButton
                icon={IconSortDescending}
                type="button"
              />
            }
            portal>
            <MenuRadioGroup value={nodeFav.nodeSorting}>
              <MenuItem
                type="radio"
                value="featured"
                onClick={() => nodeFav.setSorting("featured")}>
                Featured
              </MenuItem>
              <MenuItem
                type="radio"
                value="name"
                onClick={() => nodeFav.setSorting("name")}>
                Name
              </MenuItem>
              <MenuItem
                type="radio"
                value="last"
                onClick={() => nodeFav.setSorting("last")}>
                Last used
              </MenuItem>
              <MenuItem
                type="radio"
                value="most"
                onClick={() => nodeFav.setSorting("most")}>
                Most used
              </MenuItem>
            </MenuRadioGroup>
          </Menu>
        </SearchForm>
        <TagList
          options={Object.fromEntries(tags.map((tag) => [tag, searchTerm.tags.includes(tag.toLowerCase())]))}
          onClick={toggleTag}
          useShrink></TagList>

        <NodeList>
          {finalList.map((item) => (
            <NodePreview
              node={item}
              key={item.id}
              onClick={onClickNode}
              onFav={() => nodeFav.toggleFav(item.id)}
              isFav={nodeFav.favNodes.includes(item.id)}
            />
          ))}
        </NodeList>
      </AddModalDiv>
    </Modal>
  );
}
function extractFilteredEdgeTypeFromEditedEdge() {
  const selectedNode = usePortSelection.getState();
  let a = "";
  if (selectedNode.hasSelection) {
    if (selectedNode.location === "input") {
      a = `output:${selectedNode.type} `;
    }
    if (selectedNode.location === "output") {
      a = `input:${selectedNode.type} `;
    }
  }
  return a;
}

function sortNodeList(nodeFav: PlayerPrefStore, filteredList: NodeDefinition[], useFavSorting: boolean = true) {
  const favSorting = useFavSorting ? compareFav(nodeFav) : () => 0;
  const lastSorting = (a: NodeDefinition, b: NodeDefinition) => (nodeFav.nodesLastUsedDates[b.id] || 0) - (nodeFav.nodesLastUsedDates[a.id] || 0);
  const mostSorting = (a: NodeDefinition, b: NodeDefinition) => (nodeFav.nodesUseCount[b.id] || 0) - (nodeFav.nodesUseCount[a.id] || 0);
  const featuredSorting = (a: NodeDefinition, b: NodeDefinition) => (b.featureLevel || 0) - (a.featureLevel || 0);
  const idSorting = (a: NodeDefinition, b: NodeDefinition) => a.id.toLowerCase().localeCompare(b.id.toLowerCase());
  if (nodeFav.nodeSorting === "last") {
    filteredList.sort(sortWithPriority(favSorting, lastSorting, featuredSorting));
  } else if (nodeFav.nodeSorting === "most") {
    filteredList.sort(sortWithPriority(favSorting, mostSorting, featuredSorting));
  } else if (nodeFav.nodeSorting === "featured") {
    filteredList.sort(sortWithPriority(favSorting, featuredSorting, idSorting));
  } else {
    filteredList.sort(sortWithPriority(favSorting, idSorting, featuredSorting));
  }
  return filteredList;
}

function compareFav(nodeFav: PlayerPrefStore) {
  return (a: NodeDefinition, b: NodeDefinition) => {
    const aIsFav = nodeFav.favNodes.includes(a.id);
    const bIsFav = nodeFav.favNodes.includes(b.id);
    if (aIsFav === bIsFav) {
      return 0;
    } else {
      return aIsFav ? -1 : 1;
    }
  };
}

function sortWithPriority<T>(...comparator: ((a: T, b: T) => number)[]) {
  return (a: T, b: T) => {
    for (let index = 0; index < comparator.length; index++) {
      const element = comparator[index];
      const result = element(a, b);
      if (result !== 0) {
        return result;
      }
    }
    return 0;
  };
}
function setTargetType(node: NodeData, def: NodeDefinition, typeChange: PortType | null): void {
  if (typeChange !== null && def.availableTypes && def.availableTypes.includes(typeChange)) {
    if (def.onChangeType) {
      def.onChangeType(node, typeChange, []);
    }
    node.selectedType = typeChange;
  }
}
