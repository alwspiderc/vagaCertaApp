const Vaga = require('../models/vaga');

async function findAll() {
	try {
		return await Vaga.findAll();
	} catch (error) {
		throw new Error('Error fetching all jobs: ' + error.message);
	}
}

async function findById(id) {
	try {
		return await Vaga.findByPk(id);
	} catch (error) {
		throw new Error('Error fetching job by id: ' + error.message);
	}
}

async function create({
	titulo,
	descricao,
	dataCadastro,
	telefone,
	status,
	empresa
}) {
	try {
		return await Vaga.create({
			titulo,
			descricao,
			dataCadastro,
			telefone,
			status,
			empresa
		});
	} catch (error) {
		throw new Error('Error creating job: ' + error.message);
	}
}

async function update(
	id,
	{ titulo, descricao, dataCadastro, telefone, status, empresa }
) {
	try {
		const job = await Vaga.findByPk(id);
		if (job) {
			job.titulo = titulo;
			job.descricao = descricao;
			job.dataCadastro = dataCadastro;
			job.telefone = telefone;
			job.status = status;
			job.empresa = empresa;
			await job.save();
			return job;
		}
		return null;
	} catch (error) {
		throw new Error('Error updating job: ' + error.message);
	}
}

async function remove(id) {
	try {
		const job = await Vaga.findByPk(id);
		if (job) {
			await job.destroy();
			return job;
		}
		return null;
	} catch (error) {
		throw new Error('Error deleting job: ' + error.message);
	}
}

module.exports = {
	findAll,
	findById,
	create,
	update,
	remove
};
