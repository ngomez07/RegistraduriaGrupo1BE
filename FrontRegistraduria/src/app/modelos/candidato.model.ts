import { Partido } from "./partido.model";

export class Candidato {
    _id?: string;
    nombre?: string;
    apellido?: string;
    cedula?: string;
    numero_resolucion?: string;
    partido?: Partido;
}
