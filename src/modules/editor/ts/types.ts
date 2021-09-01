import { ButtonVariantEnum, EventTypesEnum, ModalTypesEnum } from "./enums";

export type ButtonEvent = {
	type: EventTypesEnum;
	payload: ButtonEvent['type'] extends EventTypesEnum.MODAL_OPEN ? ModalTypesEnum : string;
}

export type ButtonParams = {
	text: string;
	variant: ButtonVariantEnum;
	event: ButtonEvent;
}