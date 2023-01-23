# !pip install easyocr
import easyocr
import cv2
from matplotlib import pyplot as plt
import os
from os import path


folder = 'upload\\'
# img1 = cv2.imread(filename)
for filename in os.listdir(folder):
    img1 = cv2.imread(os.path.join(folder,filename))
    extension = (os.path.splitext(os.path.join(folder,filename)))[1]
# print(extension)

if filename.endswith('.png') or filename.endswith('.jpg'): 
  img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
  equ = cv2.equalizeHist(img1)
  reader = easyocr.Reader(['en'], gpu=False)
  result = reader.readtext(equ)

# print(result)

font = cv2.FONT_HERSHEY_SIMPLEX

img = img1
spacer = 100
output = ""
for detection in result:
  # print(detection)
  tupple_top_left = tuple(int(item) for item in tuple(detection[0][0]))
  tupple_bottom_right = tuple(int(item) for item in tuple(detection[0][2]))
  # top_left = tuple(int(detection[0][0]))
  # bottom_right = tuple(detection[0][2])
  top_left = tupple_top_left
  bottom_right = tupple_bottom_right
  # print(top_left)
  text = detection[1]
  output = output + text + " "
  img = cv2.rectangle(img,top_left,bottom_right,(0,255,0),5)
  # img = cv2.putText(img,text,(20,spacer), font, 0.5,(0,255,0),2,cv2.LINE_AA)
  spacer+=15   
  
# print(output)
def transformStr(str):
    str = ''.join(e for e in str if e.isalnum() or e==" ")
    str = str.upper()
    return str

b = transformStr(output)
print(b,end='')

# make this final output
# plt.figure(figsize=(3, 5))
# plt.imshow(img)
# plt.show()
path_ = path.join('run', 'image' + extension)
# print(path)
cv2.imwrite(path_, img)
