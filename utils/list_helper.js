const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const likes = blogs.map(blog => blog.likes)
    const initialValue = 0;
    const sumWithInitial = likes.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
    );
    return sumWithInitial
}

module.exports = {
    dummy,
    totalLikes
}