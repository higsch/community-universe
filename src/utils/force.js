// @ts-nocheck
import { forceSimulation, forceCollide, forceY, forceManyBody } from 'd3';

export const layoutForce = ({ data, width, height }) => {
	const copyData = [...data];
	return new Promise((resolve) => {
		forceSimulation()
			.nodes(copyData)
			.force(
				'y',
				forceY((d) => d.targetY)
			)
      .force('charge', forceManyBody().strength(-30))
			.force(
				'collision',
				forceCollide((d) => d.r)
			)
			.on('tick', () => {
				for (let i = 0; i < copyData.length; i++) {
					const d = copyData[i];
					d.x = Math.max(d.r, Math.min(width - d.r, d.x));
					d.y = Math.max(d.r, Math.min(height - d.r, d.y));
				}
			})
			.on('end', () => {
				resolve(copyData);
			})
			.alphaMin(0.8);
	});
};
