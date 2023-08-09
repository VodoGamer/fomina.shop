"""category: add image_path

Revision ID: d77d638b1650
Revises: 888f058f4b33
Create Date: 2023-07-18 19:43:19.201745

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "d77d638b1650"
down_revision = "888f058f4b33"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column("category", sa.Column("image_path", sa.String(length=255), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column("category", "image_path")
    # ### end Alembic commands ###
