import React, {useEffect} from 'react';
import './App.css';
import { ButtonForm } from "./modules/editor/components/ButtonDialog/ButtonForm";
import { ButtonParams } from "./modules/editor/ts/types";
import {TextPreview} from "./modules/editor/components/TextPreview/TextPreview";

export type Structure = {
	inner: string,
	Tag: React.ElementType,
	props?: any
}

const buttonRegex = /\[([^<>]+)\](\S+.)(\[[^<>]+\])/gm;

const App: React.FC = () => {
	const [seoText, setSeoText] = React.useState<string>('');
	const [structure, setStructure] = React.useState<Structure[]>([]);
	
	const onSeoTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { value } = e.target;
		setSeoText(value);
	}
	
	const addButton = (button: ButtonParams) => {
		const buttonStr = `[button|${button.variant}|${button.event.type}|${button.event.payload}]${button.text}[/button]`;
		setSeoText(prevState => `${prevState}\n\n${buttonStr}\n\n`)
	}
	
	const buttonProcess = (i: string) => {
		const componentData = i.split(buttonRegex).filter(i => !!i);
		const compProps = componentData[0].split('|');

		return {
			inner: componentData[1],
			Tag: 'button' as React.ElementType,
			props: {
				type: 'button',
				class: `btn btn-${compProps[1]}`,
				'data-event-type': compProps[2],
				'data-event-payload': compProps[3]
			}
		}
	}
	
	const onSubmitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		setStructure([]);
		const draftStructure: Structure[] = [];
		
		seoText
			.split('\n\n')
			.forEach((i, index, array) => {
				if (buttonRegex.test(i)) {
					const buttonStructure = buttonProcess(i);
					draftStructure.push(buttonStructure);
				}
				if (index === array.length - 1) {
					// кладём в сторейдж для эмуляции
					localStorage.setItem('html', JSON.stringify(draftStructure))
				}
			});
	};
	
    return (
    	<>
	        <form onSubmit={onSubmitHandler}>
		        <textarea value={seoText} onChange={onSeoTextChange} />
		        <br />
		        <button type='submit'>отправить</button>
	        </form>
		    <ButtonForm onAddButton={addButton} />
		    <TextPreview />
	    </>
    );
}

export { App };
