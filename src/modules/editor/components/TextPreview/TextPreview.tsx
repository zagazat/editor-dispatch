import React from "react";
import {Structure} from "../../../../App";
import {useEventListener} from "../../../../core/hooks/useEventListener";

export const TextPreview: React.FC = () => {
    const [scheme, setScheme] = React.useState<Structure[]>([]);
    
    useEventListener('button::modalOpen', (event) => {
        const { payload } = (event as CustomEvent).detail
        alert(`modalOpen, ${ payload }`);
    });
    
    useEventListener('button::historyAction', (event) => {
        const { payload } = (event as CustomEvent).detail
        alert(`historyAction, ${ payload }`);
    });
    
    React.useEffect(() => {
        // здесь запрашиваем html-ку с сервера и кладём её в стейт для дальнейшего взаимодействия
        const schemeArr = localStorage.getItem('html') || '[]';
        setScheme(JSON.parse(schemeArr));
    }, []);
    
    const onClickHandler = (e: React.MouseEvent<HTMLDivElement>, eventType: string, eventPayload: string) => {
        return document.dispatchEvent(new CustomEvent(`button::${eventType}`, {
            detail: {
                payload: eventPayload
            }
        }))
    }
    
    return (
        <>
            {scheme.map((item, index) => {
                const { Tag } = item;
                if (item.props['data-event-type']) {
                    item.props['onClick'] = (e: React.MouseEvent<HTMLDivElement>) => onClickHandler(e, item.props['data-event-type'], item.props['data-event-payload'])
                }
                return <Tag {...item.props} key={index}>{item.inner}</Tag>
            })}
        </>
    )
}