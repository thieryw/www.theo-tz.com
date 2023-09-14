import { useTranslation, declareComponentKeys, useLang } from "i18n";
import { makeStyles, Text, breakpointsValues } from "theme";
import portraitJpg from "../assets/img/bio/bio.jpg";
import portraitWebp from "../assets/webp/bio/bio.webp";
import signaturePng from "../assets/img/bio/signature.png";
import ReactMarkdown from "react-markdown";
import { LinkButton } from "../components/LinkButton";
import { distinctions, exposition, press } from "../user";

export function Biography() {
	const { t } = useTranslation({ Biography });
	const { classes, cx } = useStyles();
	const { lang } = useLang();

	return <div className={classes.root}>
		<section className={classes.bio}>
			<Text className={classes.title} typo="my title">{t("title")}</Text>
			<Text className={classes.introText} typo="body 1">{t("introText")}</Text>
			<div className={classes.bioInner}>
				<picture>
					<source type="image/webp" srcSet={portraitWebp} />
					<source type="image/jpeg" srcSet={portraitJpg} />
					<img className={classes.portrait} src={portraitWebp} alt="portrait de l'auteur" />
				</picture>
				<div className={classes.bioInnerParagraph}>
					<div className={classes.decoLine}></div>
					<ReactMarkdown className={classes.bioText}>{t("bioText")}</ReactMarkdown>
					<img className={classes.signature} src={signaturePng} alt="signature" />

				</div>

			</div>
			<div className={classes.journalism}>
				<div className={classes.journalismTitleWrapper}>
					<Text typo="page heading">{t("linkToArticlesTitle")}</Text>
					<Text className={classes.articleTitleItalic} typo="page heading">{t("linkToArticlesTitleItalic")}</Text>
				</div>
				<LinkButton
					className={classes.articleLink}
					label={t("linkToArticlesLabel")}
					link={{
						"href": "https://ginkio.com/theo-tz",
					}}
				/>


			</div>

		</section>
		<section className={classes.distinctionsAndOtherEvents}>
			<div className={cx(classes.eventWrapper, classes.distinctions)}>
				<Text className={classes.wrapperTitle} typo="page heading">{t("distinctionsTitle")}</Text>
				<Distinctions
					distinctions={distinctions.map(d => d[lang])}
				/>
			</div>

			<div className={cx(classes.eventWrapper, classes.exhibitions)}>
				<Text className={classes.wrapperTitle} typo="page heading">{t("exhibitionTitle")}</Text>
				<Distinctions
					distinctions={exposition.map(e => e[lang])}
				/>
			</div>

			<div className={classes.eventWrapper}>
				<Text className={classes.wrapperTitle} typo="page heading">{t("pressTitle")}</Text>
				<Distinctions
					distinctions={press.map(p => p[lang])}
				/>
			</div>

		</section>
	</div>

}

const useStyles = makeStyles()((theme) => {
	return ({
		"root": {
		},
		"bio": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center",
			"paddingTop": theme.spacing(10),
			"width": "100vw",
			...theme.spacing.rightLeft("padding", `${theme.spacing(6)}px`),
		},
		"bioInner": {
			"display": "flex",
			"flexDirection": theme.windowInnerWidth < breakpointsValues.md ? "column" : undefined

		},
		"portrait": {
			"maxWidth": 400,
			"width": "100%",
			"height": "auto",
			"marginRight": theme.windowInnerWidth >= breakpointsValues.md ? theme.spacing(6) : undefined,
			"position": "relative",
			"top": theme.spacing(7),
			"marginBottom": theme.windowInnerWidth < breakpointsValues.md ? theme.spacing(6) : undefined

		},
		"bioText": {
			"maxWidth": 400,
			"marginTop": theme.spacing(7)

		},
		"bioInnerParagraph": {
			"marginLeft": theme.windowInnerWidth >= breakpointsValues.md ? theme.spacing(6) : undefined,
			"display": "flex",
			"flexDirection": "column",
			"marginBottom": theme.windowInnerWidth < breakpointsValues.md ? theme.spacing(7) : undefined


		},
		"title": {
			"marginBottom": theme.spacing(5)
		},
		"introText": {
			"textAlign": "center",
			"maxWidth": 900,
			"marginBottom": theme.spacing(7)
		},
		"decoLine": {
			"width": theme.spacing(11),
			"height": 1,
			"border": `solid ${theme.colors.useCases.typography.textSecondary} 1px`
		},
		"signature": {
			"width": 130,
			"alignSelf": "flex-end"
		},
		"articleTitleItalic": {
			"fontStyle": "italic"
		},
		"journalism": {
			"display": "flex",
			"alignItems": "flex-end",
			"flexDirection": theme.windowInnerWidth < breakpointsValues.sm ? "column" : undefined,
			"marginBottom": theme.spacing(9)
		},
		"journalismTitleWrapper": {
			"marginRight": theme.windowInnerWidth >= breakpointsValues.sm ? theme.spacing(5) : undefined,
			"marginBottom": theme.windowInnerWidth < breakpointsValues.sm ? theme.spacing(6) : undefined
		},
		"articleLink": {
			"marginLeft": theme.spacing(5),
			"transform": `translateY(-${theme.spacing(1)}px)`

		},
		"distinctionsAndOtherEvents": {
			...theme.spacing.rightLeft("padding", `${theme.spacing(6)}px`),
			"backgroundColor": theme.colors.useCases.surfaces.surface1,
			...theme.spacing.topBottom("padding", `${theme.spacing(8)}px`),
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center",
			"width": "100vw",

		},
		"eventWrapper": {
			"display": "flex",
			"flexDirection": "column",
			"alignItems": "center"

		},
		"distinctions": {
			"marginBottom": theme.spacing(9)

		},
		"exhibitions": {
			"marginBottom": theme.spacing(9)

		},
		"wrapperTitle": {
			"marginBottom": theme.spacing(6)
		}
	})
})

const { Distinctions } = (() => {

	type DistinctionsProps = {
		distinctions: {
			title: string;
			reward: string;

		}[]
	}

	function Distinctions(props: DistinctionsProps) {
		const { distinctions } = props;

		const { classes, theme } = useStyles();



		return <div className={classes.root}>
			{
				distinctions.map(({ reward, title }, index) => <div style={{
					"marginBottom": index === distinctions.length - 1 ? undefined : theme.spacing(theme.windowInnerWidth < breakpointsValues.sm ? 5 : 3)
				}} className={classes.wrapper} key={title}>

					<div className={classes.titleWrapper}>
						<Text className={classes.title} typo="body 1">{title}</Text>

					</div>
					<div className={classes.rewardWrapper}>

						<Text className={classes.reward} typo="body 1">{reward}</Text>
					</div>
				</div>)
			}
		</div>
	}

	const useStyles = makeStyles()(theme => {
		return ({
			"root": {},
			"rewardWrapper": {
				"display": "flex",
				"justifyContent": theme.windowInnerWidth < breakpointsValues.sm ? undefined : "flex-start"

			},
			"reward": {
				"fontWeight": "bold",
				"textAlign": theme.windowInnerWidth < breakpointsValues.sm ? "center" : undefined
			},
			"titleWrapper": {
				"display": "flex",
				"justifyContent": theme.windowInnerWidth < breakpointsValues.sm ? undefined : "flex-end"
			},
			"title": {
				"textAlign": theme.windowInnerWidth < breakpointsValues.sm ? "center" : undefined

			},
			"wrapper": {
				"display": "grid",
				"gridTemplateColumns": `repeat(${theme.windowInnerWidth < breakpointsValues.sm ? 1 : 2}, 1fr)`,
				"gap": theme.windowInnerWidth < breakpointsValues.sm ? undefined : theme.spacing(6),
				"justifyItems": theme.windowInnerWidth < breakpointsValues.sm ? "center" : undefined

			}

		})
	});



	return { Distinctions }
})()


export const { i18n } = declareComponentKeys<
	"title" |
	"introText" |
	"bioText" |
	"linkToArticlesTitle" |
	"linkToArticlesTitleItalic" |
	"linkToArticlesLabel" |
	"distinctionsTitle" |
	"exhibitionTitle" |
	"pressTitle"

>()({ Biography });