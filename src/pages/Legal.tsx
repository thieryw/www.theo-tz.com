import { memo } from "react";


export const Legal = memo(() => {
    return <div style={{
        "paddingLeft": 50,
        "paddingRight": 50,
        "paddingTop": 150,
        "paddingBottom": 150
    }}>
        <h1>MENTIONS LÉGALES</h1>

        <p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l'économie numérique, il est précisé aux utilisateurs du site Théo Tzélépoglou l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.</p>

        <h2>Edition du site</h2>
        <p>Le présent site, accessible à l’URL <a href="http://www.theo-tz.com">www.theo-tz.com</a> (le « Site »), est édité par :</p>
        <p>Théo Tzélépoglou, résidant 77 bis rue pierre cazeneuve 31200 Toulouse, de nationalité Française (France), né(e) le 30/08/1993, ainsi qu'au R.M. sous le numéro 882 562 390 00022,</p>

        <h2>Hébergement</h2>
        <p>Le Site est hébergé par GitHub Pages, service de GitHub, Inc., situé au 88 Colin P Kelly Jr St, San Francisco, CA 94107, États-Unis. Pour les contacts, veuillez vous référer à la <a href="https://support.github.com/">page support de GitHub</a>.</p>

        <h2>Directeur de publication</h2>
        <p>Le Directeur de la publication du Site est Théo Tzélépoglou.</p>

        <h2>Nous contacter</h2>
        <ul>
            <li>Par téléphone : +33766235058</li>
            <li>Par email : <a href="mailto:theo.tzelepoglou@gmail.com">theo.tzelepoglou@gmail.com</a></li>
            <li>Par courrier : 77 bis rue pierre cazeneuve 31200 Toulouse</li>
        </ul>

        <p>Génération des mentions légales par Legalstart.</p>
    </div>
})