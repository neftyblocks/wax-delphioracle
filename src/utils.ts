import { RpcError, type Api } from "eosjs";
import type { Action } from "eosjs/dist/eosjs-serialize";

/**
 * Transaction
 */
export async function transact(api: Api, actions: Action[]): Promise<string> {
    let trx_id = '';
    try {
        const result = (await api.transact({actions}, { blocksBehind: 3, expireSeconds: 30 })) as {transaction_id: string};
        trx_id = result.transaction_id;

        for (const action of actions) {
            console.log(`${action.account}::${action.name} [${JSON.stringify(action.data)}] => ${trx_id}`);
        }
    } catch (e) {
        if (e instanceof RpcError) {
            const {name, what, details} = e.json.error
            const message = (details[0]) ? details[0].message : `[${name}] ${what}`;
            console.error(message);
        }
    }
    return trx_id;
}
