import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const useActiveGroup = (root: string) => {
	const location = useLocation();
	const [opened, setOpened] = useState(false);

	const toggle = () => setOpened((o) => !o);

	useEffect(() => {
		const hasChildren = location.pathname.includes(root);

		if (hasChildren) {
			setOpened(true);
			return;
		}

		setOpened(false);
	}, [root, location]);

	return { opened, toggle };
};

export default useActiveGroup;
