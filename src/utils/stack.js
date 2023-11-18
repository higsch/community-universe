// @ts-nocheck
import {
	stack,
	union,
	index,
	stackOffsetSilhouette,
	interpolateNumber,
} from 'd3';

export const createStack = ({ data }) => {
	const minData = data.map(d => {
		return {
			...d,
			value: d.value < 5 ? 5 : d.value
		};
	});
	return stack()
		.keys(union(minData.map((d) => d.role)))
		.value(([, d], key) => d.get(key).value)
		.offset(stackOffsetSilhouette)(
		index(
			minData,
			(d) => d.year,
			(d) => d.role
		)
	);
};

export const reduceLayers = ({ data, scale = 0.9 }) => {
	return data.map((layer) => {
		const outerReducedData = layer.map((positions) => {
			const interpolator = interpolateNumber(positions[0], positions[1]);
			let reducedData = [interpolator(1 - scale), interpolator(scale)];
			reducedData.data = positions.data;
			return reducedData;
		});
		outerReducedData.key = layer.key;
		outerReducedData.index = layer.index;
		return outerReducedData;
	});
};

export const createSubStack = ({ data, scale = 4 }) => {
	const nLayers = data.length;
	const positions = data[0].map((d) => d.data[0]);

	const transformed = Array.from({ length: nLayers }).map((_, iLayer) => {
		const layerData = data[iLayer];
		const nLines = Math.max(
			1,
			Math.floor(
				Math.max(...layerData.map((d) => Math.abs(d[0] - d[1]))) / scale
			)
		);
		const subData = Array.from({ length: nLines }).map((_, iLine) => {
			const renderedPositions = positions.map((position, iPosition) => {
				const value = interpolateNumber(
					layerData[iPosition][0],
					layerData[iPosition][1]
				)(iLine / nLines);
				return [position, value];
			});
			return renderedPositions;
		});
		return {
			data: subData,
			key: layerData.key,
		};
	});

	return transformed;
};
