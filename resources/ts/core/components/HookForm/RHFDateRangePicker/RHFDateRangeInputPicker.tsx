import { Controller, useFormContext } from "react-hook-form";
import { DatePickerInput } from "@mantine/dates";
import { IconCalendar as Calendar } from "@tabler/icons-react";

const RHFDateRangeInputPicker = ({
	label,
	name,
	placeholder = "Seleccionar...",
	locale = "es",
	format = "DD-MM-YYYY",
	...rest
}: CORE.Components.IRHFDateRangeInputPicker) => {
	const { control } = useFormContext();

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<DatePickerInput
					{...field}
					id={name}
					label={label}
					error={error?.message}
					placeholder={placeholder}
					locale={locale}
					valueFormat={format}
					icon={<Calendar size={16} />}
					type="range"
					{...rest}
				/>
			)}
		/>
	);
};

export default RHFDateRangeInputPicker;
