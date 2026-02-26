
function blocoDespesas() {
    const frm = document.querySelector('form');
    const despesas = [];

    frm.addEventListener('submit', (e) => {
        e.preventDefault();

        const valor = validValor();
        const descricao = validDescricao();
        const categoria = validCategoria();

        if (valor === null || descricao === null || categoria === null) return;

        addDespesa(valor, descricao, categoria, despesas);
        mostraTotal();
        mostraTotalPorCategoria();

    })

    function mostraTotal() {
        const valorTotal = despesas.reduce((acc, n) => {
            acc += n.valor
            return acc
        }, 0)

        

        const total = document.querySelector('#total');
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

        const listaCategorias = document.querySelector('#porCategoria');
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

        item.innerText = `${despesa.descricao} - R$ ${despesa.valor} - ${despesa.categoria}`

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
        const categInp = document.querySelector('#categoria');
        const categoria = categInp.value.trim();

        if (categoria.length === 0) {
            setErro();
            return null;
        }
        return categoria.toLowerCase();

    }

    function validDescricao() {
        const descInp = document.querySelector('#descricao');
        const descricao = descInp.value.trim();

        if (descricao.length === 0) {
            setErro();
            return null;
        }
        return descricao;

    }

    function validValor() {
        const valorInp = document.querySelector('#valor');
        const valor = Number(valorInp.value);

        if (isNaN(valor) || valor <= 0) {
            setErro();
            return null;
        }

        return valor;
    }

    function setErro() {
        console.log('Erro')
    }
}

blocoDespesas();