import { Mesa } from "./mesa.model";
import { Candidato } from "./candidato.model";

export class Resultado {
    _id?: string;
    numero_votos?: string;
    candidato?: Candidato;
    mesa?: Mesa;

}
