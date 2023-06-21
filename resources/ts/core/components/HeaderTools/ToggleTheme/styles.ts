import { createStyles } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		switch: {
			"& .mantine-Switch-track": {
				cursor: "pointer",

				"& svg": {
					color: theme.colors.gray[6],
				},
			},
		},
	};
});

export default styles;
