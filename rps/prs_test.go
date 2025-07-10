package rps

import (
	"fmt"
	"testing"
)

func TestPlayRound(t *testing.T) {
	for i := 0; i < 3; i++ {
		round := PlayRound(i)
		switch i {
		case 0:
			fmt.Println("El jugador eligió PIEDRA")
		case 1:
			fmt.Println("El jugador eligió PAPEL")
		case 2:
			fmt.Println("El jugador eligió TIJERA")
		}
		fmt.Printf("Message: %s\nComputerChoice: %s\nRoundResult: %s\nComputerChoiceInt: %d\nComputerScore: %s\nPlayerScore: %s\n", round.Message, round.ComputerChoice, round.RoundResult, round.ComputerChoiceInt, round.ComputerScore, round.PlayerScore)

		fmt.Println("========================================================")
	}

}
