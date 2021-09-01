import React from "react";
import { ButtonParams } from "../../ts/types";
import cn from 'classnames';

type Props = {
	button: ButtonParams
}

export const ButtonPreview: React.FC<Props> = ({ button }) => {
	return (
		<div>
			<p>Превью кнопки:</p>
			{!!button.text && <button
				className={cn('btn', `btn-${button.variant}`)}
				type='button'
				data-event-type={button.event.type}
				data-event-payload={button.event.payload}
			>{button.text}</button>}
		</div>
	)
}