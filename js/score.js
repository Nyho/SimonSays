$(document).ready(function(){

	var playerscore = 3000;

	var boutonscore = document.getElementById('boutonscore');

	boutonscore.onclick = function(){
	getname();
	};

	function getname(){
	currentplayer = document.formscore.pseudoplayer.value;
	var playername = currentplayer;
	var formulaire = document.getElementById('formulaire');
	console.log(currentplayer);
	formulaire.setAttribute('style','display:none');
	var scoreJoueur = { nom: playername, valeur : playerscore };
	putScoreInTabScore(scoreJoueur);
	}




	function createScore(){
		var score = [
			{ nom : 'SIMON', valeur: '0'},
			{ nom : 'SIMON', valeur: '0'},
			{ nom : 'SIMON', valeur: '0'},
			{ nom : 'SIMON', valeur: '0'},
			{ nom : 'SIMON', valeur: '0'},
			{ nom : 'SIMON', valeur: '0'}
		];
		return score;
	}

	function getScoreFromLs() {
		var scoreStr = localStorage.getItem('simon-score');
		score = JSON.parse(scoreStr);
		if (!score){
			score = createScore();
		}
		return score;
	}

	function saveTabScoreInLs(tabScore) {
		localStorage.setItem('simon-score', JSON.stringify(tabScore));
	}

	function composeHtmlScore(tabScore){
		var scoreHtml  = "<table>";
			scoreHtml += "<thead>";
			scoreHtml += "<tr><th>Name</th><th>Score</th></tr>";
			scoreHtml += "</thead>";
			scoreHtml += "<tbody>";
			for (let i = 0; i < tabScore.length; i++) {
				scoreHtml += "<tr>";
				scoreHtml += "<td>"+ tabScore[i].nom +"</td>";
				scoreHtml += "<td>"+ tabScore[i].valeur +"</td>";
				scoreHtml += "</tr>";
			}
			scoreHtml += "</tbody>";
			scoreHtml += "</table>";
		return scoreHtml;
	}

	function afficheScore(tabScore){
		var scoreHtml = composeHtmlScore(tabScore);
		$(".score").html(scoreHtml);
	}
	afficheScore(getScoreFromLs());

	function sortTabScore(tabScore) {
		var tabScoreOrdonned = tabScore.sort(function(a, b){
			var va = a.valeur;
			var vb = b.valeur;
			if ( va > vb ) return -1;
			if ( vb >= va ) return 1;
		});
		return tabScoreOrdonned;
	}

	function getOnlyTop(tabScore){
		return tabScore.splice(0, 6);
	}

	function putScoreInTabScore( newScore ){
		var tabScore = getScoreFromLs();
		tabScore.push(newScore);
		tabScore = sortTabScore(tabScore);
		tabScore = getOnlyTop(tabScore);
		saveTabScoreInLs(tabScore);
		afficheScore(tabScore);
	}

});
