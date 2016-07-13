var colors = ['red', 'green', 'blue', 'yellow'];

var sequence = [];
var round = 0;

var playCount = 0;
var strict = false;

var green = new Audio('sound/simonSound1.mp3');
var red = new Audio('sound/simonSound2.mp3');
var yellow = new Audio('sound/simonSound3.mp3');
var blue = new Audio('sound/simonSound4.mp3');
var wrong = new Audio('sound/soundWrong.mp3');

function newLevel() {
	playCount = 0;
	if (ok) {
		sequence.push(Math.floor(Math.random() * 4));
		round++;
		if (round > 20) {
			alert('You win!');
			restart();
		}
	} else {
		ok = 1;
	}
	animate(sequence);
	if (round < 10) {
		$('#display').html('0' + round);
	} else {
		$('#display').html(round);
	}
}

function animate(sequence) {
	var i = 0;
	var interval = setInterval(function() {

		var tile = '#' + colors[sequence[i]];
		lightUp(tile);

		i++;
		if (i >= sequence.length) {
			clearInterval(interval);
		}
	}, 600);
}

function lightUp(tile) {
	$(tile).addClass('active');
	var c = tile;
	if (tile.charAt(0) === '#') {
		var c = tile.slice(1);
	}

	switch (c) {
	case 'green':
		green.play();
		break;
	case 'red':
		red.play();
		break;
	case 'yellow':
		yellow.play();
		break;
	case 'blue':
		blue.play();
		break;
	default:
		wrong.play();
	}

	setTimeout(function() {
		$(tile).removeClass('active');
	}, 300);
}

function startNewLevel(playCount) {
	if (sequence.length == playCount) {
		setTimeout(function() {
			newLevel()
		}, 1000)
	}
}

function restart() {
	sequence = [];
	round = 0;
	playCount = 0;
	$('#display').html('0' + round);
	$('#start').prop('disabled', false);
}

$('.simon').click(function() {

	playCount++;

	var simon = $(this).attr('data-tile');

	var tile = '#' + $(this).attr('id');

	lightUp(tile);

	if (simon != sequence[playCount - 1]) {
		wrong.play();
		$('#display').html('ERR!');
		ok = 0;
		setTimeout(function() {
			if (strict) {
				restart();
			}
			else {
				newLevel();
			}
		}, 1000)
	}

	if (ok > 0) {
		startNewLevel(playCount);
	}

})

$('#reset').click(restart)

$('#strict').click(function() {

	if (strict == true) {
		strict = false;
	} else {
		strict = true;
	}

})

$('#start').click(function() {
	ok = 1;
	newLevel();
	$(this).prop('disabled', true);
})
