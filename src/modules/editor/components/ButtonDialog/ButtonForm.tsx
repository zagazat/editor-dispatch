import React, {FC, useState} from "react";
import { ButtonVariantEnum, EventTypesEnum, ModalTypesEnum } from "../../ts/enums";
import { ButtonParams } from "../../ts/types";
import { ButtonPreview } from "./ButtonPreview";

type ButtonFormProps = {
	/**
	 * Добавляем форматированный тег кнопки в текстовый редактор
	 * @param button
	 */
	onAddButton: (button: ButtonParams) => void;
}

export const ButtonForm: FC<ButtonFormProps> = (props) => {
	const [buttonParams, setButtonParams] = useState<ButtonParams>({
		text: '',
		variant: ButtonVariantEnum.PRIMARY,
		event: {
			type: EventTypesEnum.MODAL_OPEN,
			payload: ModalTypesEnum.REGISTRATION
		}
	});
	
	const onButtonSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		props.onAddButton(buttonParams);
	}
	
	const typeSelectHandler = (buttonType: ButtonVariantEnum) => {
		setButtonParams(prevState => ({
			...prevState,
			variant: buttonType
		}))
	}
	
	const renderPayloadField = () => {
		switch (buttonParams.event.type) {
			case EventTypesEnum.HISTORY_ACTION:
				return (
					<input type='text' value={buttonParams.event.payload} onChange={(e) => changeEventHandler(e, 'payload')}/>
				)
			case EventTypesEnum.MODAL_OPEN:
				return (
					<select value={buttonParams.event.payload} onChange={(e) => changeEventHandler(e, 'payload')}>
						<option value={ModalTypesEnum.REGISTRATION}>Регистрация</option>
						<option value={ModalTypesEnum.FEEDBACK}>Обратная связь</option>
					</select>
				)
		}
	}
	
	const changeEventHandler = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>, key: keyof ButtonParams['event']) => {
		setButtonParams(prevState => ({
			...prevState,
			event: {
				...prevState.event,
				[key]: e.target.value
			}
		}))
	}
	
	return (
		<>
			<p>Форма добавления кнопки</p>
			<form onSubmit={onButtonSubmit}>
				<div className="form-group">
					<label htmlFor="buttonText">Текст кнопки: </label>
					<input type='text' id='buttonText' value={buttonParams.text} onChange={(e) => setButtonParams(prevState => ({
						...prevState,
						text: e.target.value
					}))} />
				</div>
				<hr/>
				<div>
					<p>Вариант кнопки: </p>
					<label htmlFor="variantPrimary">Primary</label>
					<input type='radio' id='variantPrimary' name='variant' value={ButtonVariantEnum.PRIMARY} onChange={() => typeSelectHandler(ButtonVariantEnum.PRIMARY)} />
					<label htmlFor="variantOutlined">Outlined</label>
					<input type='radio' id='variantOutlined' name='variant' value={ButtonVariantEnum.OUTLINED} onChange={() => typeSelectHandler(ButtonVariantEnum.OUTLINED)} />
					<label htmlFor="variantText">Text</label>
					<input type='radio' id='variantText' name='variant' value={ButtonVariantEnum.TEXT} onChange={() => typeSelectHandler(ButtonVariantEnum.TEXT)} />
				</div>
				<hr/>
				<div className="form-group">
					<p>Событие для кнопки: </p>
					<select value={buttonParams.event.type} onChange={(e) => changeEventHandler(e, 'type')}>
						<option value={EventTypesEnum.MODAL_OPEN}>modalOpen</option>
						<option value={EventTypesEnum.HISTORY_ACTION}>historyAction</option>
					</select>
					{renderPayloadField()}
				</div>
				<button type='submit'>Добавить кнопку</button>
			</form>
			<ButtonPreview button={buttonParams} />
		</>
	)
}
