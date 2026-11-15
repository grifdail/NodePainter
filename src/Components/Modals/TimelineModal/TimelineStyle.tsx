import styled from "styled-components";

export const TimelineStyle = styled.div`
    width: auto;
    overflow-x: hidden;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: top;
    gap: var(--padding-medium);
    align-items: stretch;
    overflow-y: auto;

    section:has(&) {
        overflow: hidden;
    }

    .add-button {
        display: flex;
        flex-direction: column;
        gap: var(--padding-small);
        align-items: center;
        grid-column: 1 / 3;
        background-color: var(--color-background-card);
        padding: var(--padding-medium);
        border-radius: var(--border-radius-medium);
        justify-content: center;
        text-align: center;
    }

    .track-display {
        display: flex;
        flex-direction: row;
        align-items: end;
        justify-content:start;
        gap: var(--padding-small);
        border-left: var(--border-size) solid var(--color-property);
        padding-left: var(--padding-large);
         @media (max-width: 500px) {
                flex-direction: column;
                padding-left: var(--padding-small);
                align-items:stretch;
            }

        .track-info {
            width: 200px;
            display: flex;
            flex-direction: column;
            justify-content: end;
            align-items: stretch;
            align-self: stretch;

            @media (max-width: 500px) {
                width: auto;
            }

            & .title svg {
                color: var(--color-property);
            }

            & div {
                display: flex;
                gap: var(--padding-small);
                align-items:center;
            }
        }

        .tracks-line {
            background: var(--color-input);
            border: var(--border-size) solid var(--color-border);
            min-width: 400px;
            flex: 1 1 auto;
            height: 25px;
            position: relative;
            box-sizing: border-box;
            margin-right: 15px;
            margin-left: 15px;

            @media (max-width: 500px) {
                margin-right: 15px;
                margin-left: 15px;
                min-width: 0;
                align-self:stretch  ;
            }
           

            & .cursor {
                height: 100%;
                position: absolute;

                &:after {
                    
                    width: 3px;
                    height: 25px;
                    content: " ";
                    display: block;
                    background-color: green;
                    translate: -50%;
                }
            }

            & .keyframe {
                height: 100%;
                position: absolute;

                &::before {
                    
                    width: 20px;
                    height: 20px;
                    content: " ";
                    display: block;
                    background-color: var(--color-property);
                    translate: -50%;
                    border-radius: 50%;
                }
                &.selected::after {
                    position: absolute;
                    top: 5px;
                    width: 10px;
                    height: 10px;
                    content: " ";
                    display: block;
                    background-color: white;
                    translate: -50% 0;
                    border-radius: 50%;
                }
            }
        }
    }

    


   

    @media (max-width: 500px) {
        display: flex;
        flex-direction: column;
        align-items: stretch;

        & > div:nth-child(2) {
            align-self: stretch;
                    overflow-y: unset;
        }
    }

   
`;