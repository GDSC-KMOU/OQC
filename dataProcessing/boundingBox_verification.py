import cv2
import matplotlib.pyplot as plt

def visualize_bounding_boxes(image_path, txt_path):
    
    # 이미지 읽기
    image = cv2.imread(image_path)
    # 이미지 색상 채널 순서 변경
    # (OpenCV는 BGR, Matplotlib는 RGB를 사용하기 때문에 변환 필요)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

    # txt파일 오픈후 라인별로 읽기
    with open(txt_path, 'r') as file:
        lines = file.readlines()

    for line in lines:
        # 각 라인 공백으로 분할
        line = line.strip().split()
        # class_name 저장
        class_name = line[0]
        # 나머지는 txt파일 순서로 저장
        center_x, center_y, width, height = map(float, line[1:])
        
        # Bounding Box의 좌상단, 우하단 좌표 계산
        x_min = int((center_x - width / 2) * image.shape[1])
        y_min = int((center_y - height / 2) * image.shape[0])
        x_max = int((center_x + width / 2) * image.shape[1])
        y_max = int((center_y + height / 2) * image.shape[0])

        # Bounding Box 그리기
        cv2.rectangle(image, (x_min, y_min), (x_max, y_max), (0, 255, 0), 2)
        # 라벨링 넘버 표시
        cv2.putText(image, class_name, (x_min, y_min - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 0, 0), 2)

    plt.figure(figsize=(12, 12))
    plt.imshow(image)
    plt.axis('off')
    plt.show()

# 이미지경로, txt경로
image_path = '0.jpg'
txt_path = '0.txt'

visualize_bounding_boxes(image_path, txt_path)