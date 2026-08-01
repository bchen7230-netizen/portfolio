# Exporting CAD for the 3D viewer

The viewer runs in a browser, so it cannot open native CAD files. SolidWorks
`.SLDPRT` / `.SLDASM`, Inventor `.ipt` / `.iam` and Parasolid `.x_t` will never
work, no matter what tool you use. You have to export.

## What the viewer can open

| Format | Extension | Notes |
|---|---|---|
| STEP | `.step` `.stp` | **Best choice.** True geometry, small files, opens everywhere. |
| STL | `.stl` | Triangles only, no curves. Fine for display. Set a fine deviation. |
| 3MF | `.3mf` | Good, keeps colour. |
| OBJ | `.obj` | Works, needs the `.mtl` alongside it for materials. |
| glTF / GLB | `.glb` `.gltf` | Smallest and fastest if you already have one. |
| PLY | `.ply` | Works. Mostly from scanners. |
| IGES | `.iges` `.igs` | Works, but STEP is better. |

## SolidWorks — export STEP (recommended)

1. **File > Save As**
2. Save as type: **STEP AP214 (\*.step;\*.stp)**
   AP214 keeps colour information; AP203 is fine if AP214 is unavailable.
3. Click **Options** and set **Output as: Solid/Surface geometry**.
4. Save into `assets/cad/`.

## SolidWorks — export STL (if STEP is too large)

1. **File > Save As**, type: **STL (\*.stl)**
2. Click **Options**:
   - Output as **Binary** (much smaller than ASCII)
   - Resolution: **Custom**
   - Deviation: around **0.05 mm**, Angle: around **5 deg**
   - Tick **Do not translate STL output data to positive space**
3. Save into `assets/cad/`.

Aim for under about 15 MB. If a STEP file is bigger than that, export STL
instead, or suppress internal detail nobody can see anyway.

## Fusion 360

**File > Export**, choose **STEP** or **STL**, save into `assets/cad/`.

## Add it to the site

Open `content/portfolio.js`, find the project, and edit its `cad` block:

```js
{ t: "cad", label: "Gearbox housing", file: "assets/cad/gearbox.step",
  units: "mm", note: "Machined from 6061-T6." }
```

That is the whole process. Reload the page and the model appears.

## Units

Set `units` to `"mm"` or `"in"` so the bounding-box readout is right. STEP files
carry their own units; the label is what the viewer displays next to the numbers.
