import bpy
import math
import mathutils

model_path = "mi8_colored_base_yellow.glb"

bpy.ops.object.select_all(action='SELECT')
bpy.ops.object.delete(use_global=False)

bpy.ops.import_scene.gltf(filepath=model_path)


def hex_to_rgba(hex_str):
    hex_str = hex_str.lstrip('#')
    r = int(hex_str[0:2], 16) / 255.0
    g = int(hex_str[2:4], 16) / 255.0
    b = int(hex_str[4:6], 16) / 255.0
    return (r, g, b, 1.0)

main_obj = bpy.data.objects.get("lopocty")

if main_obj is None or main_obj.data is None or not hasattr(main_obj.data, 'materials'):
    main_obj = None
    for obj in bpy.data.objects:
        if obj.data is not None and hasattr(obj.data, 'materials') and len(obj.data.materials) > 0:
            main_obj = obj
            break

if main_obj is None:
    print("Не найден ни один объект с материалом — не меняем цвет.")
else:
    print(f"Меняем цвет у объекта '{main_obj.name}'")
    if main_obj.data and hasattr(main_obj.data, 'materials') and len(main_obj.data.materials) > 0:
        mat = main_obj.data.materials[0]
        if mat and mat.node_tree:
            principled_node = None
            for node in mat.node_tree.nodes:
                if node.type == 'BSDF_PRINCIPLED':
                    principled_node = node
                    break

            if principled_node:
                dark_blue = hex_to_rgba("09134D")
                principled_node.inputs['Base Color'].default_value = dark_blue
                print(f"Материал '{mat.name}': Base Color установлен в {dark_blue}")
            else:
                print(f"В материале '{mat.name}' не найден нод Principled BSDF.")
        else:
            print(f"У объекта '{main_obj.name}' нет активного материала с нодами.")
    else:
        print(f"У объекта '{main_obj.name}' нет материалов.")


main_rotor_name = "lopocty"   
tail_rotor_name = "zad.vint"  

tail = bpy.data.objects.get(tail_rotor_name)
if tail:
    bpy.context.view_layer.objects.active = tail
    tail.select_set(True)
    bpy.ops.object.origin_set(type='ORIGIN_CENTER_OF_VOLUME', center='MEDIAN')
    tail.select_set(False)
else:
    print(f"Задний винт '{tail_rotor_name}' не найден — origin не установлен.")

bpy.context.scene.frame_start = 1
bpy.context.scene.frame_end   = 60

main = bpy.data.objects.get(main_rotor_name)
if main:
    main.rotation_mode = 'XYZ'
    bpy.context.view_layer.objects.active = main
    main.select_set(True)

    bpy.context.scene.frame_set(1)
    main.rotation_euler = (0.0, 0.0, 0.0)
    main.keyframe_insert(data_path="rotation_euler", frame=1)

    bpy.context.scene.frame_set(60)
    rot_main = [0.0, 0.0, 0.0]
    rot_main[1] = 2 * math.pi  # ось Y
    main.rotation_euler = tuple(rot_main)
    main.keyframe_insert(data_path="rotation_euler", frame=60)

    action_main = main.animation_data.action
    for fcurve in action_main.fcurves:
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'LINEAR'
        mod = fcurve.modifiers.new(type='CYCLES')
        mod.mode_before = 'REPEAT'
        mod.mode_after  = 'REPEAT'
    main.select_set(False)
else:
    print(f"Главный ротор '{main_rotor_name}' не найден — анимация не создана.")

tail = bpy.data.objects.get(tail_rotor_name)
if tail:
    tail.rotation_mode = 'XYZ'
    bpy.context.view_layer.objects.active = tail
    tail.select_set(True)

    bpy.context.scene.frame_set(1)
    tail.rotation_euler = (0.0, 0.0, 0.0)
    tail.keyframe_insert(data_path="rotation_euler", frame=1)

    bpy.context.scene.frame_set(60)
    rot_tail = [0.0, 0.0, 0.0]
    rot_tail[0] = 2 * math.pi  # ось X
    tail.rotation_euler = tuple(rot_tail)
    tail.keyframe_insert(data_path="rotation_euler", frame=60)

    action_tail = tail.animation_data.action
    for fcurve in action_tail.fcurves:
        for kp in fcurve.keyframe_points:
            kp.interpolation = 'LINEAR'
        mod = fcurve.modifiers.new(type='CYCLES')
        mod.mode_before = 'REPEAT'
        mod.mode_after  = 'REPEAT'
    tail.select_set(False)
else:
    print(f"Задний винт '{tail_rotor_name}' не найден — анимация не создана.")

output_path = "test.glb"
bpy.ops.export_scene.gltf(filepath=output_path, export_animations=True)

print(f"Готово! Файл сохранён как '{output_path}'")
