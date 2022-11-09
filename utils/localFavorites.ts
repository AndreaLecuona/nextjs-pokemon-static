const toggleFavorite = ( id: number) => {
    
    let favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    if( favorites.includes(id) ){
        favorites= favorites.filter( (pokeId) => pokeId !== id );
    } else {
        favorites.push( id );
    }

    localStorage.setItem('favorites', JSON.stringify(favorites));
}

const existsInFavorites = ( id: number ): boolean => { //el boolean es el tipo de dato que va a regresar la función
    
    if( typeof window === 'undefined' ) return false; //validación de seguridad para evitar el error de no poder acceder al local storage por ejecutarse del lado del servidor

    const favorites: number[] = JSON.parse( localStorage.getItem('favorites') || '[]' );

    return favorites.includes( id );
}

const favoritePokemonsGetter = (): number[] => {

    return JSON.parse(localStorage.getItem('favorites') || '[]' );

} 

const exportedFn = {
    toggleFavorite,
    existsInFavorites,
    favoritePokemonsGetter
}

export default exportedFn