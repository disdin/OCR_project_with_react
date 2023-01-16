# !pip install easyocr
import easyocr
import cv2
from matplotlib import pyplot as plt
import numpy as np
import os
from os import listdir

def histogram_show(img):
  hist,bins = np.histogram(img.flatten(),256,[0,256])
  cdf = hist.cumsum()
  cdf_normalized = cdf * float(hist.max()) / cdf.max()
  plt.plot(cdf_normalized, color = 'b')
  plt.hist(img.flatten(),256,[0,256], color = 'r')
  plt.xlim([0,256])
  plt.legend(('cdf','histogram'), loc = 'upper left')
  plt.show()  


filename = 'pic.jpg'
img1 = cv2.imread(filename)

if filename.endswith('.png') or filename.endswith('.jpg'):    
  plt.imshow(img1)
  plt.figure()
  img1 = cv2.cvtColor(img1, cv2.COLOR_BGR2GRAY)
  histogram_show(img1)
  equ = cv2.equalizeHist(img1)
  plt.imshow(equ)
  plt.figure()
  histogram_show(equ)
  reader = easyocr.Reader(['en'], gpu=False)
  result = reader.readtext(equ)


font = cv2.FONT_HERSHEY_SIMPLEX

img = img1
spacer = 100
output = ""
top_left = tuple(result[0][0])
bottom_right = tuple(result[0][2])
text = result[1]
output = output + text + " "
img = cv2.rectangle(img,top_left,bottom_right,(0,255,0),3)
img = cv2.putText(img,text,(20,spacer), font, 0.5,(0,255,0),2,cv2.LINE_AA)
spacer+=15   
  
print(output)
# make this final output
plt.figure(figsize=(3, 5))
plt.imshow(img)
plt.show()