import { Controller, useFormContext } from "react-hook-form";
import { ColorPicker, Text } from "@mantine/core";

import { defaultSwatches } from "@core/constants";

const RHFColorPicker = ({ label, name, swatches, ...rest }: CORE.Components.IRHFColorPicker) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div>
					<Text>{label}</Text>
					<ColorPicker {...field} id={name} swatches={swatches ?? defaultSwatches} withPicker={false} fullWidth {...rest} />
					<Text align="center" sx={{ marginTop: 5 }}>
						{field.value} {error?.message}
					</Text>
				</div>
			)}
		/>
	);
};

export default RHFColorPicker;
