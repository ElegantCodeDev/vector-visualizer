import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three-stdlib";
import { LineGeometry } from "three-stdlib";
import { LineMaterial } from "three-stdlib";
import { Box, Typography } from "@mui/material";

const VectorDisplay = ({ vector1, vector2, resultVector }) => {
	const mountRef = useRef(null);
	const controlsRef = useRef(null);
	const [renderer, setRenderer] = useState(null);
	const [scene, setScene] = useState(null);

	const scaleFactor = 10;

	useEffect(() => {
		if (renderer === null) {
			const newRenderer = new THREE.WebGLRenderer();
			newRenderer.setSize(
				window.innerWidth * 0.8,
				window.innerHeight * 0.8
			);
			setRenderer(newRenderer);
		}
		if (scene === null) {
			const newScene = new THREE.Scene();
			newScene.background = new THREE.Color(0xeeeeee);
			setScene(newScene);
		}
	}, [renderer, scene]);

	useEffect(() => {
		if (renderer === null || scene === null) return;

		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		);
		camera.position.z = 50;

		controlsRef.current = new OrbitControls(camera, renderer.domElement);
		controlsRef.current.update();
		controlsRef.current.enableZoom = true;
		controlsRef.current.enablePan = true;
		controlsRef.current.enableRotate = true;

		if (
			mountRef.current &&
			!mountRef.current.contains(renderer.domElement)
		) {
			mountRef.current.appendChild(renderer.domElement);
		}

		scene.clear();

		const arrowVector1 = new THREE.Vector3(
			vector1.x * scaleFactor,
			vector1.y * scaleFactor,
			vector1.z * scaleFactor
		);
		const arrowVector2 = new THREE.Vector3(
			vector2.x * scaleFactor,
			vector2.y * scaleFactor,
			vector2.z * scaleFactor
		);
		let arrowVectorResult;
		if (resultVector) {
			arrowVectorResult = new THREE.Vector3(
				resultVector[0] * scaleFactor,
				resultVector[1] * scaleFactor,
				resultVector[2] * scaleFactor
			);
		}
		const origin = new THREE.Vector3(0, 0, 0);

		const material = new LineMaterial({ linewidth: 3, color: 0xff0000 });
		const geometry1 = new LineGeometry();
		geometry1.setPositions([
			origin.x,
			origin.y,
			origin.z,
			arrowVector1.x,
			arrowVector1.y,
			arrowVector1.z,
		]);
		material.resolution.set(
			window.innerWidth * 0.8,
			window.innerHeight * 0.8
		);
		const line1 = new THREE.Line(geometry1, material);
		scene.add(line1);

		const geometry2 = new LineGeometry();
		geometry2.setPositions([
			origin.x,
			origin.y,
			origin.z,
			arrowVector2.x,
			arrowVector2.y,
			arrowVector2.z,
		]);
		const line2 = new THREE.Line(geometry2, material);
		scene.add(line2);

		if (arrowVectorResult) {
			const resultMaterial = new LineMaterial({
				linewidth: 3,
				color: 0x0000ff,
			});
			const resultGeometry = new LineGeometry();
			resultGeometry.setPositions([
				origin.x,
				origin.y,
				origin.z,
				arrowVectorResult.x,
				arrowVectorResult.y,
				arrowVectorResult.z,
			]);
			resultMaterial.resolution.set(
				window.innerWidth * 0.8,
				window.innerHeight * 0.8
			);
			const resultLine = new THREE.Line(resultGeometry, resultMaterial);
			scene.add(resultLine);
		}

		const maxCoord =
			Math.max(
				Math.abs(vector1.x),
				Math.abs(vector1.y),
				Math.abs(vector1.z),
				Math.abs(vector2.x),
				Math.abs(vector2.y),
				Math.abs(vector2.z),
				resultVector ? Math.abs(resultVector[0]) : 0,
				resultVector ? Math.abs(resultVector[1]) : 0,
				resultVector ? Math.abs(resultVector[2]) : 0
			) * scaleFactor;

		const size = maxCoord * 2;
		const divisions = 10;

		const gridHelperXY = new THREE.GridHelper(size, divisions, 0x999999);
		scene.add(gridHelperXY);

		const gridHelperYZ = new THREE.GridHelper(size, divisions, 0x999999);
		gridHelperYZ.rotation.z = Math.PI / 2;
		scene.add(gridHelperYZ);

		const gridHelperZX = new THREE.GridHelper(size, divisions, 0x999999);
		gridHelperZX.rotation.x = Math.PI / 2;
		scene.add(gridHelperZX);

		const animate = function () {
			requestAnimationFrame(animate);
			controlsRef.current.update();
			renderer.render(scene, camera);
		};

		animate();

		return () => {
			if (
				mountRef.current &&
				mountRef.current.contains(renderer.domElement)
			) {
				mountRef.current.removeChild(renderer.domElement);
			}
		};
	}, [renderer, scene, vector1, vector2, resultVector]);

	return (
		<Box mt={4} display="flex" justifyContent="center" alignItems="center">
			<Box position="relative">
				<div ref={mountRef} />
				<Box position="absolute" right={10} top="50%">
					<Typography variant="h6">Z</Typography>
				</Box>
				<Box position="absolute" bottom={10} left="50%">
					<Typography variant="h6">X</Typography>
				</Box>
				<Box position="absolute" top={10} left="50%">
					<Typography variant="h6">Y</Typography>
				</Box>
			</Box>
		</Box>
	);
};

export default VectorDisplay;
