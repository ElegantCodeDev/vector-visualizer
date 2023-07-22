import { Grid, Box, Typography } from "@mui/material";
import VectorDisplay from "./components/VectorDisplay";
import VectorInput from "./components/VectorInput";
import VectorMath from "./components/VectorMath";
import Footer from "./components/Footer";
import { useState } from "react";
import { vec3 } from "gl-matrix";

function App() {
	const [vector1, setVector1] = useState({ x: 3, y: 2, z: 1 });
	const [vector2, setVector2] = useState({ x: -1, y: 2, z: 3 });
	const [operation, setOperation] = useState("");

	const handleVectorChange = (newVector, isVector1) => {
		if (isVector1) {
			setVector1(newVector);
		} else {
			setVector2(newVector);
		}
	};

	const handleOperationChange = (newOperation) => {
		setOperation(newOperation);
	};

	const v1 = [vector1.x, vector1.y, vector1.z];
	const v2 = [vector2.x, vector2.y, vector2.z];

	// Calculate the result vector based on the selected operation
	let resultVector;
	switch (operation) {
		case "add":
			resultVector = vec3.add(vec3.create(), v1, v2);
			break;
		case "subtract":
			resultVector = vec3.subtract(vec3.create(), v1, v2);
			break;
		case "cross":
			resultVector = vec3.cross(vec3.create(), v1, v2);
			break;
		case "normalize":
			resultVector = vec3.normalize(vec3.create(), v1);
			break;
		default:
			resultVector = null;
	}

	return (
		<>
			<Box>
				<Typography variant="h4" gutterBottom align="center">
					Enter Vector Coordinates
				</Typography>
				<Grid container justifyContent="center">
					<Grid item xs={12} md={8}>
						<VectorInput
							initialVector={vector1}
							isVector1={true}
							onVectorChange={handleVectorChange}
						/>
						<VectorInput
							initialVector={vector2}
							isVector1={false}
							onVectorChange={handleVectorChange}
						/>
						<VectorDisplay
							vector1={vector1}
							vector2={vector2}
							resultVector={resultVector}
						/>
						<VectorMath
							vector1={vector1}
							vector2={vector2}
							onOperationChange={handleOperationChange}
						/>
					</Grid>
				</Grid>
			</Box>
			<Footer />
		</>
	);
}

export default App;
