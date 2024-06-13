function calcular() {
    var idade = parseFloat(document.getElementById('idade').value);
    var peso = parseFloat(document.getElementById('peso').value);
    var altura = parseFloat(document.getElementById('altura').value);

    if (idade && peso && altura) {
        var imc = peso / (altura * altura); // Agora altura está em metros

        var planosA = calcularPlanosOperadoraA(idade, imc);
        var planosB = calcularPlanosOperadoraB(imc);

        var valores = [
            { nome: 'Básico', valor: planosA.basico, operadora: 'Operadora A' },
            { nome: 'Standard', valor: planosA.standard, operadora: 'Operadora A' },
            { nome: 'Premium', valor: planosA.premium, operadora: 'Operadora A' },
            { nome: 'Básico', valor: planosB.basico, operadora: 'Operadora B' },
            { nome: 'Standard', valor: planosB.standard, operadora: 'Operadora B' },
            { nome: 'Premium', valor: planosB.premium, operadora: 'Operadora B' }
        ];

        valores = valores.filter(function(plano) {
            return plano.valor >= 0;
        });

        valores.sort(function(a, b) {
            return a.valor - b.valor;
        });

        var maisBaratoGeral = valores.length > 0 ? valores[0] : null;

        document.getElementById('basicoA').innerText = truncarNumero(planosA.basico);
        document.getElementById('standardA').innerText = truncarNumero(planosA.standard);
        document.getElementById('premiumA').innerText = truncarNumero(planosA.premium);

        document.getElementById('basicoB').innerText = truncarNumero(planosB.basico);
        document.getElementById('standardB').innerText = truncarNumero(planosB.standard);
        document.getElementById('premiumB').innerText = truncarNumero(planosB.premium);

        if (maisBaratoGeral) {
            document.getElementById('maisBaratoNome').innerText = maisBaratoGeral.nome;
            document.getElementById('maisBaratoValor').innerText = truncarNumero(maisBaratoGeral.valor);
            document.getElementById('maisBaratoOperadora').innerText = maisBaratoGeral.operadora;
        } else {
            document.getElementById('maisBaratoNome').innerText = '';
            document.getElementById('maisBaratoValor').innerText = '';
            document.getElementById('maisBaratoOperadora').innerText = '';
        }

        document.getElementById('resultado').classList.remove('hidden');
        document.getElementById('planoIdeal').classList.remove('hidden');

        function truncarNumero(numero) {
            return Math.floor(numero * 100) / 100;
        }
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function calcularPlanosOperadoraA(idade, imc) {
    var basico = 100 + (idade * 10 * (imc / 10));
    var standard = (150 + (idade * 15)) * (imc / 10);
    var premium = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    return {
        basico: basico,
        standard: standard,
        premium: premium
    };
}

function calcularPlanosOperadoraB(imc) {
    var fatorDeComorbidade;

    if (imc < 18.5) {
        fatorDeComorbidade = 10;
    } else if (imc >= 18.5 && imc < 25) {
        fatorDeComorbidade = 1;
    } else if (imc >= 25 && imc < 30) {
        fatorDeComorbidade = 6;
    } else if (imc >= 30 && imc < 35) {
        fatorDeComorbidade = 10;
    } else if (imc >= 35 && imc < 40) {
        fatorDeComorbidade = 20;
    } else {
        fatorDeComorbidade = 30;
    }
    var basico = 100 + (fatorDeComorbidade * 10 * (imc / 10));
    var standard = (150 + (fatorDeComorbidade * 15)) * (imc / 10);
    var premium = (200 - (imc * 10) + (fatorDeComorbidade * 20)) * (imc / 10);

    return {
        basico: basico,
        standard: standard,
        premium: premium
    };
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('botao1').addEventListener('click', function() {
        document.querySelector('.minha-coluna').classList.remove('hidden');
    });
});
