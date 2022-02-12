const combinacoesVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let numeroJogadas = 0;
let vezCirculo = false;
let jogadorDaRodada = 'X';

const areas = document.querySelectorAll('.areas-jogada');
areas.forEach( area => area.addEventListener('click', () => {
    if ( !area.textContent ) {
        fazerJogada(jogadorDaRodada, area);
        jogadorDaRodada = mudarTurno();
    } else {
        alert('Área já ocupada!');
    };
}));


function mudarTurno() {
    vezCirculo = !vezCirculo;

    if ( vezCirculo ) {
        return 'O';
    } else {
        return 'X';
    };
};

function fazerJogada(jogadorDaRodada, areaJogada) {
    areaJogada.classList.add(jogadorDaRodada)
    areaJogada.textContent = jogadorDaRodada
    numeroJogadas++;

    if ( numeroJogadas >= 5 ) {
        verificarSeTemGanhador(jogadorDaRodada);
    };
};

function verificarSeTemGanhador(jogador) {
    const alguemGanhou = combinacoesVitoria.some( combinacao => {
        return combinacao.every( valor => {
            return areas[valor].classList.contains(jogador);
        });
    });
    
    if ( alguemGanhou ) {
        fimDeJogo('ganhou', jogador);
    } else if ( numeroJogadas === 9 ) {
        fimDeJogo('empate');
    };
};

function fimDeJogo(resultado, ganhador=undefined) {
    document.querySelector('#tela-fim-jogo').classList.add('mostrar');

    const mostrarResultado = document.querySelector('#resultado');
    mostrarResultado.textContent = ganhador ? `${ganhador} ${resultado}` : resultado;

    const btn_JogarNovamente = document.querySelector('#btn-playAgain');
    btn_JogarNovamente.addEventListener('click', () => location.reload());
};
