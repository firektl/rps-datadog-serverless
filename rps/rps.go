package rps

import (
	"math/rand"
	"strconv"
)

const (
	ROCK     = 0
	PAPER    = 1
	SCISSORS = 2
)

type Round struct {
	Message           string `json:"message"`
	ComputerChoice    string `json:"computer_choice"`
	RoundResult       string `json:"round_result"`
	ComputerChoiceInt int    `json:"computer_choice_int"`
	ComputerScore     string `json:"computer_score"`
	PlayerScore       string `json:"player_score"`
}

// "Deberías comprar un boleto de lotería",*/
var winMessages = []string{
	"¡Bien echo!",
	"¡Buen trabajo!",
}

// "Hoy simplemente no es tu día",*/
var loseMessages = []string{

	"¡Qué lástima!",
}

var drawMessages = []string{
	"Oh oh, Inténtalo de nuevo",
	/*"Las grandes mentes piensan igual",
	"Nadie gana, pero puedes intentarlo de nuevo",*/
}

var ComputerScore, PlayerScore int

func PlayRound(playerValue int) Round {
	computerValue := rand.Intn(3)
	var computerChoice, roundResult string
	var computerChoiceInt int

	switch computerValue {
	case ROCK:
		computerChoiceInt = ROCK
		computerChoice = "La computadora eligió PIEDRA"
	case PAPER:
		computerChoiceInt = PAPER
		computerChoice = "La computadora eligió PAPEL"
	case SCISSORS:
		computerChoiceInt = SCISSORS
		computerChoice = "La computadora eligió TIJERA"
	}

	messageInt := rand.Intn(3)

	var message string

	if playerValue == computerValue {
		roundResult = "Es un empate"
		message = drawMessages[messageInt]
	} else if playerValue == (computerValue+1)%3 {
		PlayerScore++
		roundResult = "¡El jugador gana!"
		message = winMessages[messageInt]
	} else {
		ComputerScore++
		roundResult = "!La computadora gana¡"
		message = loseMessages[messageInt]
	}

	return Round{
		Message:           message,
		ComputerChoice:    computerChoice,
		RoundResult:       roundResult,
		ComputerChoiceInt: computerChoiceInt,
		ComputerScore:     strconv.Itoa(ComputerScore),
		PlayerScore:       strconv.Itoa(PlayerScore),
	}
}
