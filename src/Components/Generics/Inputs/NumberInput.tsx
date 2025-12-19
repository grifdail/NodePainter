import { all, create } from "mathjs";
import { useSubmitOnBlur } from "../../../Hooks/useSubmitOnBlur";
import { applyConstraint } from "../../../Utils/ui/applyConstraints";
import { Input } from "../../StyledComponents/Input";
import { InputProps } from "./InputProps";

const math = create(all);
const limitedEvaluate = math.evaluate;

const ua = navigator.userAgent.toLowerCase();
const isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

math.import(
    {
        import: function () {
            throw new Error("Function import is disabled");
        },
        createUnit: function () {
            throw new Error("Function createUnit is disabled");
        },
        evaluate: function () {
            throw new Error("Function evaluate is disabled");
        },
        parse: function () {
            throw new Error("Function parse is disabled");
        },
        simplify: function () {
            throw new Error("Function simplify is disabled");
        },
        derivative: function () {
            throw new Error("Function derivative is disabled");
        },
    },
    { override: true }
);

export function NumberInput({ onChange, value, className, constrains = [] }: InputProps<number> & { className?: string }) {
    var { rawField, setRawField, onBlur } = useSubmitOnBlur(
        value || 0,
        (a) => a.toString(),
        onChange,
        (newValue: string): undefined | number => {
            try {
                const parsed = limitedEvaluate(rawField);
                if (rawField !== "" && !Number.isNaN(parsed)) {
                    return applyConstraint(parsed, value, constrains);
                }
                return undefined;
            } catch (err) {
                console.warn(err);
                return undefined;
            }
        }
    );

    return (
        <Input
            className={className}
            value={rawField}
            onContextMenu={(e) => (isAndroid ? e.preventDefault() : null)}
            onFocus={(e) => e.target.select()}
            onChange={(e) => setRawField(e.target.value)}
            onBlur={(e) => onBlur(e.target.value)}
        />
    );
}
