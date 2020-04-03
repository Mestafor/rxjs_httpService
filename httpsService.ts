import { Observable } from 'rxjs';
import { delay, retryWhen, scan } from 'rxjs/operators';

function retryStrategy<T>({attempts = 4, delay: delayTime = 1000}) {
    return function (errors: Observable<T>) {
        return errors.pipe(
            scan((acc, value) => {
                acc += 1;
                if(acc < attempts) {
                    return acc;
                }
                else {
                    throw new Error(value as any);
                }
            }, 0),
            // takeWhile(acc => acc < attempts),
            delay(delayTime)
        );
    }
}

export function httpGET<T>(url: string): Observable<T> {
    
    return new Observable<T>(subscriber => {
        fetch(url)
            .then((res: Response) => {
                return res.json();
            })
            .then(res => {
                subscriber.next(res);
                subscriber.complete();
            })
            .catch(e => {
                subscriber.error(e);
            });

        return () => {
            console.log('cleanup');
            subscriber.unsubscribe();
        }

    })
        .pipe(
            retryWhen(retryStrategy<T>({}))
        );
}