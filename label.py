import os
import shutil
import json

# (이름) 종합
# ㄴ (이름)
# ㄴ (이름) 이미지
# ㄴ (이름) 처리 완료
#
# 이렇게 만들어놓고
# 가장 밖에서 돌릴 것

select = {
    '밥상' : 0,
    '서랍장' : 1,
    '소파' : 2,
    '의자' : 3,
    '장롱' : 4,
    '책상' : 5,
}

print("메인 폴터 이름 : ", end = "")
name = input()

basic_dir = os.path.join(name + " 종합", name)
image_dir = os.path.join(name + " 종합", name + " 이미지")
write_dir = os.path.join(name + " 종합", name + " 처리 완료")

for dir_in in os.listdir(write_dir):
    os.remove(os.path.join(write_dir, dir_in))

count = 0
for dir_in in os.listdir(basic_dir):
    sub_dir = os.path.join(basic_dir, dir_in)
    for dir_in_in in os.listdir(sub_dir):
        json_dir = os.path.join(sub_dir, dir_in_in)

        remove = 0

        with open(json_dir, 'r', encoding = 'utf-8') as f:
            write_txt_dir = os.path.join(write_dir, str(count) + ".txt")
            write_image_dir = os.path.join(write_dir, str(count) + ".jpg")
        
            with open(write_txt_dir, 'w', encoding = 'utf-8') as f1:
                count += 1

                json_data = json.load(f)

                shutil.copyfile(os.path.join(image_dir, dir_in, json_data["FILE NAME"]), write_image_dir)

                max_size = json_data["RESOLUTION"]
                max_size = max_size.split("*")

                max_size_x, max_size_y = [int(for_a) for for_a in max_size]

                txt_data = ''

                for bound in json_data["Bounding"]:
                    if bound["DETAILS"] in select:
                        if bound["Drawing"] == "POLYGON":
                            min_x = 2
                            max_x = -1

                            min_y = 2
                            max_y = -1

                            for bound_in in bound["PolygonPoint"]:
                                for bound_data in bound_in:
                                    data = bound_in[bound_data]
                                    data = data.split(',')

                                    data_x, data_y = [int(for_a) for for_a in data]

                                    data_x = data_x / max_size_x
                                    data_y = data_y / max_size_y

                                    if data_x > max_x:
                                        max_x = data_x

                                    if data_x < min_x:
                                        min_x = data_x

                                    if data_y > max_y:
                                        max_y = data_y

                                    if data_y < min_y:
                                        min_y = data_y
                        else:
                            x1 = int(bound['x1'])
                            x2 = int(bound['x2'])

                            y1 = int(bound['y1'])
                            y2 = int(bound['y2'])

                            if x1 > x2:
                                max_x = x1
                                min_x = x2
                            else:
                                max_x = x2
                                min_x = x1

                            if y1 > y2:
                                max_y = y1
                                min_y = y2
                            else:
                                max_y = y2
                                min_y = y1

                            max_x /= max_size_x
                            max_y /= max_size_y

                            min_x /= max_size_x
                            min_y /= max_size_y

                        width = max_x - min_x
                        height = max_y - min_y

                        center_x = (max_x + min_x) / 2
                        center_y = (max_y + min_y) / 2

                        txt_data += str(select[bound["DETAILS"]]) + ' ' + str(center_x) + ' ' + str(center_y) + ' ' + str(width) + ' ' + str(height) + '\n'

                if txt_data != '':
                    f1.write(txt_data)
                else:
                    remove = 1

            if remove == 1:
                try:
                    os.remove(write_txt_dir)
                    os.remove(write_image_dir)
                except:
                    pass

                count -= 1
