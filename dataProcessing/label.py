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

#가구별 넘버링
select = {
    '밥상' : 0,
    '서랍장' : 1,
    '소파' : 2,
    '의자' : 3,
    '장롱' : 4,
    '책상' : 5,
}

# 메인 폴더 입력
print("메인 폴터 이름 : ", end = "")
name = input()

# name 종합/name
basic_dir = os.path.join(name + " 종합", name)
# name 종합/name 이미지
image_dir = os.path.join(name + " 종합", name + " 이미지")
# name 종합/name 처리 완료
write_dir = os.path.join(name + " 종합", name + " 처리 완료")

# write_dir 폴더 비우기
for dir_in in os.listdir(write_dir):
    os.remove(os.path.join(write_dir, dir_in))

# 파일 번호
count = 0

# basic 폴더 내의 모든 서브 디렉토리 반복
for dir_in in os.listdir(basic_dir):
    # 서브 폴더 경로
    sub_dir = os.path.join(basic_dir, dir_in)
    # 각 서브폴더 내의 모든 파일 반복
    for dir_in_in in os.listdir(sub_dir):
        # json 경로
        json_dir = os.path.join(sub_dir, dir_in_in)

        # 파일 삭제 여부(x)
        remove = 0

        # json 파일 오픈
        with open(json_dir, 'r', encoding = 'utf-8') as f:
            # txt파일 생성 경로
            write_txt_dir = os.path.join(write_dir, str(count) + ".txt")
            # 이미지파일 생성 경로
            write_image_dir = os.path.join(write_dir, str(count) + ".jpg")

            # txt파일 쓰기
            with open(write_txt_dir, 'w', encoding = 'utf-8') as f1:
                # 파일 번호 순차 증가
                count += 1
                json_data = json.load(f)

                # 이미지 파일을 복사
                shutil.copyfile(os.path.join(image_dir, dir_in, json_data["FILE NAME"]), write_image_dir)

                # 이미지 해상도를 가져와서 가로, 세로 크기 할당
                max_size = json_data["RESOLUTION"]
                max_size = max_size.split("*")
                max_size_x, max_size_y = [int(for_a) for for_a in max_size]

                # 텍스트 초기화
                txt_data = ''

                # Bounding 객체에서 반복
                for bound in json_data["Bounding"]:
                    # Bounding의 DETAILS가 가구별 넘버링에 있을시
                    if bound["DETAILS"] in select:
                        # Bounding의 Drawing이 POLYGON 일시
                        if bound["Drawing"] == "POLYGON":
                            min_x = 2
                            max_x = -1

                            min_y = 2
                            max_y = -1

                            # POLYOGN객체의 PolygonPoint 전부 반복 (PolygonPoint가 여러개의 경우가 있었음)
                            for bound_in in bound["PolygonPoint"]:
                                for bound_data in bound_in:
                                    # PolygonPoint 점 좌표 추출
                                    data = bound_in[bound_data]
                                    # 쉼표로 분할(리스트 형식)
                                    data = data.split(',')

                                    # x,y 좌표 저장
                                    data_x, data_y = [int(for_a) for for_a in data]

                                    # x,y 좌표를 이미지 가로,세로 사이즈로 정규화
                                    data_x = data_x / max_size_x
                                    data_y = data_y / max_size_y

                                    # 최대,최소 x좌표 설정
                                    if data_x > max_x:
                                        max_x = data_x
                                    if data_x < min_x:
                                        min_x = data_x
                                    # 최대,최소 y좌표 설정
                                    if data_y > max_y:
                                        max_y = data_y
                                    if data_y < min_y:
                                        min_y = data_y
                        
                        # Bounding의 Drawing이 POLYGON이 아닐시(사각형)
                        else:
                            # x1,x2,y1,y2 추출
                            x1 = int(bound['x1'])
                            x2 = int(bound['x2'])
                            y1 = int(bound['y1'])
                            y2 = int(bound['y2'])

                            # x1,x2 좌표 비교후 최대x좌표 및 최소x좌표 설정
                            if x1 > x2:
                                max_x = x1
                                min_x = x2
                            else:
                                max_x = x2
                                min_x = x1

                             # y1,y2 좌표 비교후 최대x좌표 및 최소x좌표 설정
                            if y1 > y2:
                                max_y = y1
                                min_y = y2
                            else:
                                max_y = y2
                                min_y = y1

                            # 최대x좌표 정규화
                            max_x /= max_size_x
                            # 최대y좌표 정규화
                            max_y /= max_size_y
                            # 최대y좌표 정규화
                            min_x /= max_size_x
                            # 최소y좌표 정규화
                            min_y /= max_size_y

                        # 너비 계산
                        width = max_x - min_x
                        # 높이 계산
                        height = max_y - min_y
                        # 중심 x좌표 계산
                        center_x = (max_x + min_x) / 2
                        # 중심 y좌표 계산
                        center_y = (max_y + min_y) / 2

                        # txt파일에 작성할 string추가
                        txt_data += str(select[bound["DETAILS"]]) + ' ' + str(center_x) + ' ' + str(center_y) + ' ' + str(width) + ' ' + str(height) + '\n'

                # 텍스트가 비어있지 않다면 위에 작성한 string을 txt파일에 쓰기
                if txt_data != '':
                    f1.write(txt_data)
                # 작성한 string이 없다면 파일 삭제 여부(o)
                else:
                    remove = 1
            
            # 파일 삭제 여부가(o)일시 
            if remove == 1:
                # txt파일과, 이미지파일 삭제
                try:
                    os.remove(write_txt_dir)
                    os.remove(write_image_dir)
                except:
                    pass
                # 파일 번호 감소
                count -= 1
