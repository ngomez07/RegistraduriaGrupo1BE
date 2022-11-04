from Repositorios.RepositorioResultado import RepositorioResultado
from Repositorios.RepositorioCandidato import RepositorioCandidato
from Repositorios.RepositorioMesa import RepositorioMesa
from Modelos.Resultado import Resultado
from Modelos.Candidato import Candidato
from Modelos.Mesa import Mesa


class ControladorResultado():
    def __init__(self):
        self.repositorioResultado = RepositorioResultado()
        self.repositorioCandidato = RepositorioCandidato()
        self.repositorioMesa = RepositorioMesa()

    def index(self):
        return self.repositorioResultado.findAll()

    def create(self, infoResultado, id_candidato, id_mesa):
        resultado = Resultado(infoResultado)
        candidato = Candidato(self.repositorioCandidato.findById(id_candidato))
        mesa = Mesa(self.repositorioMesa.findById(id_mesa))
        resultado.candidato = candidato
        resultado.mesa = mesa
        return self.repositorioResultado.save(resultado)

    def update(self, id_resultado, infoResultado, id_candidato, id_mesa):
        resultado = Resultado(self.repositorioResultado.findById(id_resultado))
        candidato = Candidato(self.repositorioCandidato.findById(id_candidato))
        mesa = Mesa(self.repositorioMesa.findById(id_mesa))
        resultado.numero_votos = infoResultado['numero_votos']
        resultado.candidato = candidato
        resultado.mesa = mesa
        return self.repositorioResultado.save(resultado)

    def delete(self, id):
        return self.repositorioResultado.delete(id)

    def show(self,id):
        resultado = Resultado(self.repositorioResultado.findById(id))
        return resultado.__dict__
