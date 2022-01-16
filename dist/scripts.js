let pokemonRepository = (function () {
    let t = []
    function e(e) {
        e && 'object' == typeof e
            ? t.push(e)
            : console.log('This pokémon is not an object')
    }
    function o(t) {
        pokemonRepository.loadDetails(t).then(function () {
            !(function (t) {
                let e = $('.modal-body'),
                    o = $('.modal-title')
                o.empty(), e.empty()
                let n = $('<h1 class="text-capitalize">' + t.name + '</h1>'),
                    i = $('<img class="modal-img">')
                i.attr('src', t.imageUrl)
                let a = $('<p><b>Height: </b>' + t.height + '</p>'),
                    l = $('<p><b>Weight: </b>' + t.weight + '</p>'),
                    s = $(
                        '<p class="text-capitalize"><b>Types: </b>' +
                            t.types.join(', ') +
                            '</p>'
                    ),
                    p = $(
                        '<p class="text-capitalize"><b>Abilities: </b>' +
                            t.abilities.join(', ') +
                            '</p>'
                    )
                o.append(n),
                    e.append(i),
                    e.append(a),
                    e.append(l),
                    e.append(s),
                    e.append(p),
                    $('#detailsmodal').modal()
            })(t)
        })
    }
    return (
        document.querySelector('#detailsModal'),
        {
            add: e,
            addListItem: function (t) {
                let e = document.querySelector('.pokemon-list'),
                    n = document.createElement('li'),
                    i = document.createElement('button')
                i.setAttribute('data-target', '#detailsModal'),
                    i.setAttribute('data-toggle', 'modal'),
                    n.classList.add('group-list-item'),
                    n.classList.add('flex-fill'),
                    i.classList.add('btn'),
                    i.classList.add('btn-outline-secondary'),
                    i.classList.add('list-button')
                let a = document.createElement('img')
                a.setAttribute('src', 'pokemon.sprites.front_default'),
                    a.classList.add('btn-img'),
                    (i.innerText = t.name),
                    n.appendChild(i),
                    e.appendChild(n),
                    i.addEventListener('click', function () {
                        o(t)
                    })
            },
            getAll: function () {
                return t
            },
            loadList: function () {
                return fetch('https://pokeapi.co/api/v2/pokemon/?limit=150')
                    .then(function (t) {
                        return t.json()
                    })
                    .then(function (t) {
                        t.results.forEach(function (t) {
                            e({ name: t.name, detailsUrl: t.url })
                        })
                    })
                    .catch(function (t) {
                        console.error(t)
                    })
            },
            loadDetails: function (t) {
                let e = t.detailsUrl
                return fetch(e)
                    .then(function (t) {
                        return t.json()
                    })
                    .then(function (e) {
                        (t.imageUrl = e.sprites.front_default),
                            (t.height = e.height),
                            (t.weight = e.weight),
                            (t.abilities = e.abilities.flatMap(
                                (t) => t.ability.name
                            )),
                            (t.types = e.types.flatMap((t) => t.type.name))
                    })
                    .catch(function (t) {
                        console.error(t)
                    })
            },
            showDetails: o,
        }
    )
})()
pokemonRepository.loadList().then(function () {
    $('.pokemon-search').on('input', function (t) {
        t.preventDefault()
        let e = $('#myInput').val().toLowerCase()
        $('.pokemon-app').empty(''),
            '' === e
                ? pokemonRepository.getAll().forEach(function (t) {
                      pokemonRepository.addList(t)
                  })
                : pokemonRepository.getAll().forEach(function (t) {
                      t.name.toLowerCase().indexOf(e) > -1 &&
                          pokemonRepository.addList(t)
                  })
    }),
        pokemonRepository.getAll().forEach(function (t) {
            pokemonRepository.addListItem(t)
        })
})
