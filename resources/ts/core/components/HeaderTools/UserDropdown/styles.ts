import { createStyles } from "@mantine/core";

const styles = createStyles((theme) => {
	return {
		dropdown: {
			boxShadow: "0px 10px 10px -5px rgba(0, 0, 0, 0.04), 0px 20px 25px -5px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.05)",
		},
		userInfoContainer: {
			textAlign: "justify",
			[theme.fn.smallerThan("md")]: {
				display: "none",
			},
		},
	};
});

export default styles;
