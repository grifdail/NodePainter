import { IconProps } from "@tabler/icons-react";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { PortType } from "../../Types/PortType";

export const PortTypeIcon = ({ type, ...props }: IconProps & { type: PortType }) => {
    const Icon = PortTypeDefinitions[type].icon;
    return <Icon {...props}></Icon>
}