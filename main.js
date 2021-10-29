if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("sw.js")
        .then(
            reg => console.log(`Register Done : ${reg}`),
            err => console.log(`Resgister Fail : ${err}`)
        )
}