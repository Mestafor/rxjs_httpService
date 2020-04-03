import { httpGET } from "./httpsService";

const button = document.querySelector<HTMLButtonElement>('#button');

button?.addEventListener('click', e => {
    e.preventDefault();

    const subscription = httpGET<{ title: string }[]>('./movies.json')
        .subscribe(
            (value) => {
                console.log(value);
            },
            (e) => console.error('asdas', e),
            () => {
                console.log("Complete");
            }
        );
});
