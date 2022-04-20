/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: Blender3D (https://sketchfab.com/Blender3D)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/models/0d62f4d3676545c88ec8523213c055dd
title: Minecraft Diamond Axe
*/

import React, { useRef } from "react"
import { useGLTF } from "@react-three/drei"

export default function Model(props) {
  const group = useRef()
  return (
    <group ref={group} dispose={null} {...props}>
      <group rotation={[0, Math.PI / 1.8, -0.3]} scale={0.5}>
      </group>
    </group>
  )
}

useGLTF.preload("axe.glb")
