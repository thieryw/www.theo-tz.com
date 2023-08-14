import { createMakeStyles } from "tss-react";
import { createThemeProvider, 
	defaultGetTypographyDesc, 
	createDefaultColorUseCases, 
	breakpointsValues as defaultBreakpointValues ,
	defaultPalette
} from "onyxia-ui";
import { createIcon } from "onyxia-ui/Icon";
import { createText } from "onyxia-ui/Text";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";


export const { useTheme, ThemeProvider } = createThemeProvider({
	"getTypographyDesc": params => {
		const typographyDesk = defaultGetTypographyDesc(params);
		return {
			...typographyDesk,
			"fontFamily": '"Poppins", sans-serif',
			"variants": {
				...typographyDesk.variants,
				"my title": {
					"htmlComponent": "h1",
					"fontWeight": 100,
					"fontSizeRem": 3,
					"lineHeightRem": 3,
					"fontFamily": "'Cormorant Garamond', serif"
				},
				"body 1": {
					"htmlComponent": "p",
					"fontSizeRem": 0.85,
					"lineHeightRem": 1.5,
					"fontFamily": '"Poppins", sans-serif',
					"fontWeight": 300,
				},
				"page heading": {
					"htmlComponent": "h2",
					"fontWeight": 100,
					"fontSizeRem": 3,
					"lineHeightRem": 3,
					"fontFamily": "'Cormorant Garamond', serif"
				},
				"my h3": {
					"htmlComponent": "h3",
					"fontWeight": 100,
					"fontSizeRem": 2.0,
					"lineHeightRem": 2.0,
					"fontFamily": "'Cormorant Garamond', serif"

				}
			}
		}
	},
	"defaultIsDarkModeEnabled": false,
	"createColorUseCases": params => ({
		...createDefaultColorUseCases(params),
		"surfaces": {
			"background": "#f8f6f3",
			"surface1": "#fcfcfc",
			"surface2": "#f5f4f0"
		}
	}),
	"palette": {
		...defaultPalette,
		"customGradientColor": "linear-gradient(270deg, rgba(36,41,52,1) 0%, rgba(19,22,29,1) 68%)",
		"buttonColor": "#a65959",
		"transparentBackground": (params: {direction: "to left" | "to right" | "to bottom" | "to top"}) => {
			const {direction} = params;
			return `linear-gradient(${direction}, rgba(248,246,243,0.4), rgba(248,246,243,1))`;
		}


	}
});

export const { makeStyles } = createMakeStyles({ useTheme });
export const { Text } = createText({ useTheme });
export const breakpointsValues = {
	...defaultBreakpointValues,
	"lg+": 1400 as const
};

export const { Icon } = createIcon({
	"arrowForwards": ArrowForwardIosIcon,
	"arrowBack": ArrowBackIosIcon
});