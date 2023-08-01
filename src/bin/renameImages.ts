import { readdirSync, renameSync } from "fs";
import path from "path";




function getImageFiles(path: string) {
	const files: string[] = [];

	readdirSync(path).forEach(file => {
		files.push(file);
	})

	return files;

};

function renameOrderedImagesToFitNamingConvention(pathToFiles: string){
	const files = getImageFiles(pathToFiles);
	files.forEach(file => {
		if(!file.endsWith("jpg")){
			return;
		}
		const newName = `${file.match(/(\d+)/)?.[0]}-.jpg`;
		renameSync(path.join(pathToFiles, file), path.join(pathToFiles, newName))
	})
};

function renameImagesToFitNamingConvention(pathToFiles: string){
	const files = getImageFiles(pathToFiles);
	files.forEach((file, index) => {
		if(!file.endsWith("jpg")){
			return;
		}
		renameSync(path.join(pathToFiles, file), path.join(pathToFiles, `${index}-.jpg`));
	});
};

function replaceSpacesWithUnderscores(str: string) {
	return str.replace(/\s/g, '_');
}

function renameDescribedImagesToFitNamingConvention(pathToFiles: string){
	const files = getImageFiles(pathToFiles);
	files.forEach((file, index)=>{
		if(!file.endsWith("jpg")){
			return;
		}
		renameSync(path.join(pathToFiles, file), path.join(pathToFiles, replaceSpacesWithUnderscores(file)));
	})
}

renameDescribedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "naturalisme", "Antilles"));
renameDescribedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "naturalisme", "Ouest-canadien"));
renameDescribedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "naturalisme", "Réunion-Maurice"));

renameImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Evenements", "1-Anduze Jazz Camp"));
renameImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Evenements", "2-Montpellier Jazz Week #1"));
renameImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Evenements", "3- Lindy Hop Summercamp"));
renameImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "5-24h dans la vie d_une étudiante en pandémie"));
renameImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "7-Marche pour le climat"));

renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "home"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "naturalisme", "France"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Portraits", "5-Duo Kanto"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "1- Le brame du cerf dans les Cévennes"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "2- Le Grand dauphin en Méditérranée"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "3- L_Atelier papetier"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Reportages", "4-Le retour du loup en Dordogne"));
renameOrderedImagesToFitNamingConvention(path.join(__dirname, "..", "assets", "img", "Urbain"));
