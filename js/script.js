
function blocoDespesas() {
    const frm = document.querySelector('form');
    const categInp = document.querySelector('#categoria');
    const descInp = document.querySelector('#descricao');
    const valorInp = document.querySelector('#valor');

    const total = document.querySelector('#total');
    const listaCategorias = document.querySelector('#porCategoria');
    const despesas = [];

    frm.addEventListener('submit', (e) => {
        e.preventDefault();

        const valor = validValor(); // validação do valor
        const descricao = validDescricao(); // validação da descrição
        const categoria = validCategoria(); //validação categoria

        if (valor === null || descricao === null || categoria === null) return;

        addDespesa(valor, descricao, categoria, despesas);
        mostraTotal();
        mostraTotalPorCategoria();
        frm.reset();
        limpaImputs();
        focusDescricao();
    })

    frm.addEventListener('keypress', (e){
        if (e.key === 'Enter') {
            e.preventDefault();
            frm.dispatchEvent(new Event('submit'));
        }

    })

    function mostraTotal() {
        //calcula o valor total
        const valorTotal = despesas.reduce((acc, n) => acc + n.valor, 0)

        total.innerText = valorTotal;
    }

    function mostraTotalPorCategoria() {
        const resumo = despesas.reduce((acc, despesa) => {
            if (!acc[despesa.categoria]) {
                acc[despesa.categoria] = 0;
            }

            acc[despesa.categoria] += despesa.valor;

            return acc;
        }, {});


        listaCategorias.innerHTML = '';

        for (const categoria in resumo) {
            const li = document.createElement('li');
            li.innerText = `${categoria}: R$ ${resumo[categoria].toFixed(2)}`;
            listaCategorias.appendChild(li);
        }
    }

    function addDespesa(valor, descricao, categoria, despesas) {

        const novaDespesa = {
            id: criaId(),
            descricao: descricao,
            valor: valor,
            categoria: categoria
        };
        despesas.push(novaDespesa);

        mostraDespesa(novaDespesa);
    }

    function mostraDespesa(despesa) {

        const lista = document.querySelector('#lista');
        const item = document.createElement('li');
        item.setAttribute('id', despesa.id)

        item.innerText = `${despesa.descricao} - R$ ${despesa.valor.toFixed(2)} - ${despesa.categoria}`

        lista.appendChild(item);
        criaBotaoExcluir(item, despesa.id);
    }

    function criaBotaoExcluir(item, id) {
        const btnExcluir = document.createElement('button');
        btnExcluir.setAttribute('class', 'excluir');
        btnExcluir.innerText = '[ Excluir ]'
        btnExcluir.addEventListener('click', () => {

            item.remove();

            const index = despesas.findIndex(d => d.id === id);
            if (index !== -1) {
                despesas.splice(index, 1);
            }

            mostraTotal();
            mostraTotalPorCategoria();
        });
        item.appendChild(btnExcluir)
    }


    function criaId() {
        return Date.now();
    }


    function validCategoria() {
        const categoria = categInp.value.trim();

        if (categoria.length === 0) {
            setErro();
            return null;
        }
        return categoria.toLowerCase();

    }

    function validDescricao() {
        const descricao = descInp.value.trim();

        if (descricao.length === 0) {
            setErro();
            return null;
        }
        return descricao;
    }

    function validValor() {
        const valor = Number(valorInp.value);

        if (isNaN(valor) || valor <= 0) {
            setErro();
            return null;
        }

        return valor;
    }

    function limpaImputs() {
        categInp.value = '';
        descInp.value = '';
        valorInp.value = '';
    }

    function setErro() {
        console.log('Erro')
    }

    function focusDescricao() {
        document.querySelector('#descricao').focus();
    }
}

blocoDespesas();