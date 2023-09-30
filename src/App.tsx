import { useMemo, useContext } from "react";
import { routes, useRoute, groups } from "./router";
import { useTranslation, declareComponentKeys } from "i18n";
import signature from "./assets/png/signature.png";
import smallSignature from "./assets/png/signature-without-job.png";
import { makeStyles, breakpointsValues, Text } from "./theme";
import { Home } from "./pages/Home";
import { Naturalism } from "./pages/Naturalism";
import { Biography } from "./pages/Biography";
import { Reportages } from "./pages/Reportages";
import { Portraits } from "./pages/Portraits";
import { BrameCerf } from "./pages/BrameCerf";
import { Papetier } from "./pages/Papetier";
import { Dolphin } from "./pages/Dolphin";
import { WolfDordogne } from "./pages/WolfDordogne";
import { Pandemic } from "./pages/Pandemic";
import { ClimateMarch } from "./pages/ClimateMarch";
import { Events } from "./pages/Events";
import { Urbain } from "./pages/Urbain";
import { ScrollContext } from "./components/SmoothScrollProvider";
import { Footer } from "./components/Footer";
import instagramIconUrl from "./assets/svg/instagram.svg";
import facebookIconUrl from "./assets/svg/facebook.svg";
import mailIconUrl from "./assets/svg/mail.svg";
import MuiLink from "@mui/material/Link";
import { Header } from "components/Header";
import { useConstCallback } from "powerhooks/useConstCallback";


export function App() {

  const route = useRoute();
  const { t } = useTranslation({ App });
  const context = useContext(ScrollContext);


  const scrollToTop = useConstCallback(()=>{
    console.log("ok");
    context?.scrollToTop();
  })

  const links = useMemo(() => [
    {
      ...routes.home().link,
      "label": t("home")
    },
    {
      ...routes.auteur().link,
      "label": t("author")
    },
    {
      ...routes.naturalism().link,
      "label": t("naturalism")
    },
    {
      ...routes.reportage().link,
      "label": t("journalism")
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
  ], [t]);



  const { classes, cx } = useStyles();


  return (
      <div className={classes.root}>
        {
          route.name !== "home" &&
          <div onClick={scrollToTop} className={classes.homeLink}>
            <a {...routes.home().link}><img className={classes.homeLinkImg} alt="smallSignature" src={smallSignature} /></a>

          </div>
        }
        <Header
          links={links}
          title={<img className={classes.logo} src={signature} alt="logo" />}
          logoLinks={
            [
              {
                "href": "https://www.facebook.com/theotzelepoglouphotography/",
                "logo": facebookIconUrl,
              },
              {
                "href": "https://www.instagram.com/theo_tz_wildlife/",
                "logo": instagramIconUrl
              },
              {
                "href": "mailto:theo.tzelepoglou@gmail.com",
                "logo": mailIconUrl
              }
            ]
          }
          className={classes.header}
        />
        <div className={classes.body}>
          {route.name === "home" && <Home />}
          {groups.naturalism.has(route) && <Naturalism route={route} />}
          {groups.portraits.has(route) && <Portraits route={route} />}
          {groups.events.has(route) && <Events route={route} />}
          {route.name === "urban" && <Urbain />}
          {route.name === "auteur" && <Biography />}
          {route.name === "reportage" && <Reportages />}
          {route.name === "brameCerf" && <BrameCerf />}
          {route.name === "dolphin" && <Dolphin />}
          {route.name === "papetier" && <Papetier />}
          {route.name === "wolf" && <WolfDordogne />}
          {route.name === "pandemic" && <Pandemic />}
          {route.name === "climat" && <ClimateMarch />}
        </div>
        <Footer
          className={classes.footer}


          title={<a {...routes.home().link}><img onClick={scrollToTop} className={classes.signatureFooter} src={signature} alt="logo signature" /></a>}
          socialMediaLinks={[
            {
              "href": "https://www.instagram.com/theo_tz_wildlife/",
              "icon": instagramIconUrl,
              "iconWidth": 30
            },
            {
              "href": "https://www.facebook.com/theotzelepoglouphotography/",
              "icon": facebookIconUrl,
              "iconWidth": 30
            },
            {
              "href": "mailto:theo.tzelepoglou@gmail.com",
              "icon": mailIconUrl,
              "iconWidth": 30
            }
          ]}

          bottomDiv={
            <div className={classes.bottomDiv}>
              <MuiLink className={classes.legal} {...routes.legal().link}><Text className={cx(classes.legalText, classes.bottomDivElement)} typo="label 2">{t("legal")}</Text></MuiLink>
              <Text className={classes.bottomDivElement} typo="label 2">{t("copyRight")}</Text>
              <Text className={classes.bottomDivElement} typo="label 2">{t("design")}</Text>
            </div>
          }
        />


      </div>
  );
}

const useStyles = makeStyles()((theme) => {
  return ({
    "root": {
      "minHeight": "100vh",
      "display": "flex",
      "flexDirection": "column",
    },
    "homeLink": {
      "position": "fixed",
      "top": theme.spacing(4),
      "left": theme.spacing(6),
      "zIndex": 8000,
      "transition": "transform 400ms",
      ":hover": {
        "transform": "scale(1.1)"

      }
    },
    "homeLinkImg": {
      "width": theme.spacing(8)

    },
    "body": {
      "flex": "1 0 auto"
    },
    "logo": {
      "height": theme.spacing(10)
    },
    "header": {
      "marginBottom": 3
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