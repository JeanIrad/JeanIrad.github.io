import matplotlib.pyplot as plt

def draw_line_DDA(x1, y1, x2, y2):
    dx = x2 - x1
    dy = y2 - y1
    
    steps = abs(dx) if abs(dx) > abs(dy) else abs(dy)
    inc_x = dx / steps
    inc_y = dy / steps
    
    x = x1
    y = y1
    
    points = [(x, y)]
    
    for _ in range(steps):
        x += inc_x
        y += inc_y
        points.append((round(x), round(y)))
        
    return points

def main():
    print("Enter the coordinates of the endpoints (x1, y1) and (x2, y2) of the line:")
    x1 = int(input("x1: "))
    y1 = int(input("y1: "))
    x2 = int(input("x2: "))
    y2 = int(input("y2: "))
    
    line_points = draw_line_DDA(x1, y1, x2, y2)
    
    x_values = [point[0] for point in line_points]
    y_values = [point[1] for point in line_points]
    
    plt.plot(x_values, y_values, marker='o')
    plt.title('DDA Line Drawing Algorithm')
    plt.xlabel('X-axis')
    plt.ylabel('Y-axis')
    plt.grid(True)
    plt.show()

# if __name__ == "_main_":
main()