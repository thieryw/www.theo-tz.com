import { useMemo } from "react";
import { Header } from "./components/Header";
import { routes, useRoute, groups } from "./router";
import { useTranslation, declareComponentKeys } from "i18n";
import signature from "./assets/png/signature.png";
import { makeStyles, breakpointsValues, Text } from "./theme";
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Home } from "./pages/Home";
import { Naturalism } from "./pages/Naturalism";
import { Biography } from "./pages/Biography";
import { SmoothScrollProvider } from "./components/SmoothScrollProvider";
import { Footer } from "./components/Footer";
import instagramIconUrl from "./assets/svg/instagram.svg";
import facebookIconUrl from "./assets/svg/facebook.svg";
import mailIconUrl from "./assets/svg/mail.svg";
import MuiLink from "@mui/material/Link";


export function App() {
  const route = useRoute();
  const { t } = useTranslation({ App });
  const links = useMemo(() => [
    {
      ...routes.home().link,
      "label": t("home")
    },
    {
      ...routes.reportage().link,
      "label": t("journalism")
    },
    {
      ...routes.naturalism().link,
      "label": t("naturalism")
    },
    {
      ...routes.events().link,
      "label": t("events")
    },
    {
      ...routes.portraits().link,
      "label": t("portraits")
    },
    {
      ...routes.urban().link,
      "label": t("urban")
    },
    {
      ...routes.auteur().link,
      "label": t("author")

    }
  ], [t]);



  const { classes, cx, theme } = useStyles();

  return (
    <SmoothScrollProvider>
      <div className={classes.root}>
        <Header
          links={links}
          title={<img className={classes.logo} src={signature} alt="logo" />}
          position="fixed"
          behavior="smart"
          scrollToTop={true}
          logoLinks={
            [
              {
                "href": "",
                "logo": <FacebookIcon className={classes.socialMediaIcon} />,
              },
              {
                "href": "lkj",
                "logo": <InstagramIcon className={classes.socialMediaIcon} />
              }
            ]
          }
          className={classes.header}
        />
        <div className={classes.body}>
          {route.name === "home" && <Home />}
          {groups.naturalism.has(route) && <Naturalism route={route} />}
          {route.name === "auteur" && <Biography />}
        </div>
        <Footer
          className={classes.footer}


          title={<img className={classes.signatureFooter} src={signature} alt="logo signature" />}
          socialMediaLinks={[
            {
              "href": "https://www.instagram.com/theo_tz_wildlife/",
              "icon": instagramIconUrl,
              "iconWidth": theme.spacing(6)
            },
            {
              "href": "https://www.facebook.com/theotzelepoglouphotography/",
              "icon": facebookIconUrl,
              "iconWidth": theme.spacing(6)
            },
            {
              "href": "mailto:theo.tzelepoglou@gmail.com",
              "icon": mailIconUrl,
              "iconWidth": theme.spacing(6)
            }
          ]}

          bottomDiv={
            <div className={classes.bottomDiv}>
              <MuiLink className={classes.legal} {...routes.legal().link}><Text className={cx(classes.legalText, classes.bottomDivElement)} typo="label 2">{t("legal")}</Text></MuiLink>
              <Text className={classes.bottomDivElement} typo="label 2">{t("copyRight")}</Text>
              <Text className={classes.bottomDivElement} typo="label 2">{t("author")}</Text>
            </div>
          }
        />


      </div>

    </SmoothScrollProvider>
  );
}

const useStyles = makeStyles()((theme) => {
  return ({
    "root": {
      "minHeight": "100vh",
      "display": "flex",
      "flexDirection": "column",
    },
    "body": {
      "flex": "1 0 auto"
    },
    "logo": {
      "height": theme.spacing(8)
    },
    "header": {
      "marginBottom": 3
    },
    "socialMediaIcon": {
      "fill": theme.colors.palette.light.greyVariant2,
      "fontSize": `${theme.spacing(6)}px`
    },
    "bottomDiv": {
      "display": "flex",
      ...theme.spacing.topBottom("padding", `${theme.spacing(2)}px`),
      "justifyContent": "space-between",
      ...(theme.windowInnerWidth < breakpointsValues.md ? {
        "flexDirection": "column",
        "alignItems": "center"
      } : {})
    },
    "bottomDivElement": {
      "color": theme.colors.useCases.typography.textSecondary,
      ...theme.spacing.topBottom("margin", `${theme.spacing(2)}px`)
    },
    "legal": {
      "textDecoration": "none",
    },
    "legalText": {
      "transition": "color 500ms",
      ":hover": {
        "color": theme.colors.useCases.typography.textPrimary,
      }
    },
    "footer": {
      "flexShrink": 0,
      "width": "100vw"
    },
    "signatureFooter": {
      "maxWidth": 400,
      "width": "100%",
      "height": "auto"
    }

  })
})

export const { i18n } = declareComponentKeys<
  "home" |
  "events" |
  "naturalism" |
  "portraits" |
  "journalism" |
  "urban" |
  "legal" |
  "copyRight" |
  "author" |
  "design"
>()({ App });