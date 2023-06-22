import { FileInputProps, Group } from "@mantine/core";

import { isValidArray } from "@helpers";
import FileValue from "./FileValue";

const ValueComponent: FileInputProps["valueComponent"] = ({
	value,
}: CORE.Components.IRHFFileInputValueComponent) => {
	if (value && isValidArray(value)) {
		return (
			<Group spacing="sm" py="xs">
				{value.map((file, idx) => (
					<FileValue key={idx} file={file} />
				))}
			</Group>
		);
	} else if (value && !isValidArray(value)) {
		return <FileValue file={value} />;
	}

	return <></>;
};

export default ValueComponent;
