import { Controller, useFormContext } from "react-hook-form";
import { ColorInput } from "@mantine/core";

import { defaultSwatches } from "@core/constants";

const RHFColorInput = ({ label, name, swatches, ...rest }: CORE.Components.IRHFColorInput) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<ColorInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					swatches={swatches ?? defaultSwatches}
					disallowInput
					withPicker={false}
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFColorInput;
